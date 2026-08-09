// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";

interface IGuaranteePool {
    function registerGuarantee(address _member, uint256 _amount) external;
    function refundGuarantee(address _member) external;
    function slashGuarantee(address _member, address _victim) external;
}

contract TontineCircle {
    uint256 public contributionAmount;
    uint256 public guaranteeAmount; // Fixé automatiquement au pot total (cotisation * totalMembers)
    uint256 public totalMembers;
    uint256 public tourDuration;
    address public guaranteePool;
    address public creator;
    address public immutable stableToken; // Adresse du stablecoin (ex: USDC)

    address[] public members;
    mapping(address => bool) public isMember;
    mapping(address => mapping(uint256 => bool)) public hasContributed;
    mapping(address => bool) public isDefaulted; // Suivi des membres exclus pour défaut
    
    uint256 public currentTour = 1;
    uint256 public tourStartTime;
    bool public circleStarted = false;
    bool private locked; // Verrou anti-réentrance natif

    event MemberJoined(address indexed member);
    event ContributionPaid(address indexed member, uint256 tour);
    event PayoutDistributed(address indexed beneficiary, uint256 amount, uint256 tour);
    event MemberSlashedAndExcluded(address indexed member);

    modifier nonReentrant() {
        require(!locked, "Reentrance detectee");
        locked = true;
        _;
        locked = false;
    }

    constructor(
        uint256 _contributionAmount,
        uint256 _totalMembers,
        uint256 _tourDuration,
        address _guaranteePool,
        address _creator,
        address _stableToken
    ) {
        require(_contributionAmount > 0, "Cotisation invalide");
        require(_totalMembers > 0, "Nombre de membres invalide");
        require(_guaranteePool != address(0), "GuaranteePool invalide");
        require(_stableToken != address(0), "StableToken invalide");

        contributionAmount = _contributionAmount;
        totalMembers = _totalMembers;
        
        // RÈGLE IMMUABLE : La garantie est obligatoirement égale à la cagnotte totale du cercle
        guaranteeAmount = _contributionAmount * _totalMembers;

        tourDuration = _tourDuration;
        guaranteePool = _guaranteePool;
        creator = _creator;
        stableToken = _stableToken;
    }

    function joinCircle() external nonReentrant {
        require(!circleStarted, "Le cercle a deja commence");
        require(!isMember[msg.sender], "Deja membre");
        require(members.length < totalMembers, "Cercle complet");

        uint256 totalRequired = contributionAmount + guaranteeAmount;

        // 1. Prélèvement de la cotisation du tour 1 + la garantie intégrale depuis l'utilisateur
        bool successTransfer = IERC20(stableToken).transferFrom(msg.sender, address(this), totalRequired);
        require(successTransfer, "Echec du transfert des fonds (Cotisation + Garantie requise)");

        isMember[msg.sender] = true;
        members.push(msg.sender);

        // 2. Transfert physique de la garantie vers le pool externe sécurisé
        bool successGuaranteeTransfer = IERC20(stableToken).transfer(guaranteePool, guaranteeAmount);
        require(successGuaranteeTransfer, "Echec du transfert de la garantie vers le pool");

        // 3. Enregistrement comptable de la garantie dans le GuaranteePool externe
        IGuaranteePool(guaranteePool).registerGuarantee(msg.sender, guaranteeAmount);
        
        hasContributed[msg.sender][currentTour] = true;

        emit MemberJoined(msg.sender);

        if (members.length == totalMembers) {
            circleStarted = true;
            tourStartTime = block.timestamp;
        }
    }

    function contribute() external nonReentrant {
        require(circleStarted, "Le cercle n'a pas commence");
        require(isMember[msg.sender], "N'est pas membre");
        require(!isDefaulted[msg.sender], "Membre exclu");
        require(!hasContributed[msg.sender][currentTour], "Deja cotise pour ce tour");

        // Prélèvement de la cotisation en stablecoin
        bool success = IERC20(stableToken).transferFrom(msg.sender, address(this), contributionAmount);
        require(success, "Echec du transfert de la cotisation");

        hasContributed[msg.sender][currentTour] = true;
        emit ContributionPaid(msg.sender, currentTour);
    }

    /**
     * @notice Permet de déclarer un membre défaillant si le délai du tour est dépassé et qu'il n'a pas payé.
     */
    function declareDefault(address _defaultingMember) external nonReentrant {
        require(circleStarted, "Le cercle n'a pas commence");
        require(block.timestamp > tourStartTime + tourDuration, "Le tour est encore en cours");
        require(isMember[_defaultingMember], "N'est pas membre");
        require(!hasContributed[_defaultingMember][currentTour], "Le membre a bien cotise");
        require(!isDefaulted[_defaultingMember], "Deja exclu");

        isDefaulted[_defaultingMember] = true;
        
        address victim = address(0);
        for(uint i=0; i<members.length; i++) {
            if(!isDefaulted[members[i]]) {
                victim = members[i];
                break;
            }
        }

        // Exécute le slash de la garantie du tricheur via le GuaranteePool
        IGuaranteePool(guaranteePool).slashGuarantee(_defaultingMember, victim);
        emit MemberSlashedAndExcluded(_defaultingMember);
    }

    function distributePayout() external nonReentrant {
        require(circleStarted, "Le cercle n'a pas commence");
        require(block.timestamp >= tourStartTime + tourDuration, "Le tour n'est pas encore termine");
        require(currentTour <= totalMembers, "Tous les tours sont termines");

        for (uint256 i = 0; i < members.length; i++) {
            if (!isDefaulted[members[i]]) {
                require(hasContributed[members[i]][currentTour], "Un membre n'a pas cotise");
            }
        }

        address beneficiary = members[currentTour - 1];
        uint256 totalPot = contributionAmount * totalMembers;

        uint256 tourToProcess = currentTour;
        if (currentTour < totalMembers) {
            currentTour++;
            tourStartTime = block.timestamp;
        }

        if (!isDefaulted[beneficiary]) {
            bool success = IERC20(stableToken).transfer(beneficiary, totalPot);
            require(success, "Echec du transfert de la cagnotte");
            emit PayoutDistributed(beneficiary, totalPot, tourToProcess);
        }

        if (tourToProcess == totalMembers) {
            for (uint256 i = 0; i < members.length; i++) {
                if (!isDefaulted[members[i]]) {
                    IGuaranteePool(guaranteePool).refundGuarantee(members[i]);
                }
            }
        }
    }
}