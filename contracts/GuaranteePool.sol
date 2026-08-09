// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IERC20.sol";

contract GuaranteePool {
    mapping(address => uint256) public memberGuarantees;
    mapping(address => address) public memberCircle; 
    
    address public immutable houseTreasury;
    address public immutable stableToken; 
    bool private locked;

    event GuaranteeDeposited(address indexed member, uint256 amount);
    event GuaranteeWithdrawn(address indexed member, uint256 amount);
    event GuaranteeLocked(address indexed member, address indexed circle, uint256 amount);
    event GuaranteeRefunded(address indexed member, uint256 amount);
    event GuaranteeSlashed(address indexed member, address indexed victim, uint256 amount);

    modifier nonReentrant() {
        require(!locked, "Reentrance detectee");
        locked = true;
        _;
        locked = false;
    }

    constructor(address _houseTreasury, address _stableToken) {
        require(_houseTreasury != address(0), "Adresse Treasury invalide");
        require(_stableToken != address(0), "Adresse StableToken invalide");
        houseTreasury = _houseTreasury;
        stableToken = _stableToken;
    }

    function depositGuarantee(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Montant de garantie invalide");
        require(memberCircle[msg.sender] == address(0), "Garantie deja engagee dans un cercle actif");

        memberGuarantees[msg.sender] += _amount;

        bool success = IERC20(stableToken).transferFrom(msg.sender, address(this), _amount);
        require(success, "Echec du transfert du stablecoin");

        emit GuaranteeDeposited(msg.sender, _amount);
    }

    /**
     * @notice Enregistre les fonds envoyés par le TontineCircle et lie le membre.
     */
    function registerGuarantee(address _member, uint256 _amount) external nonReentrant {
        require(memberCircle[_member] == address(0), "Garantie deja engagee dans un cercle actif");
        require(_amount > 0, "Montant invalide");

        memberGuarantees[_member] += _amount;
        memberCircle[_member] = msg.sender; 

        emit GuaranteeDeposited(_member, _amount);
    }

    /**
     * @notice Permet de verrouiller une garantie déjà déposée en amont (sans refaire de transfert physique).
     */
    function lockExistingGuaranteeForCircle(address _member, uint256 _requiredAmount) external nonReentrant {
        require(memberCircle[_member] == address(0), "Membre deja dans un cercle");
        require(memberGuarantees[_member] >= _requiredAmount, "Solde de garantie prealable insuffisant");
        
        memberCircle[_member] = msg.sender; 

        emit GuaranteeLocked(_member, msg.sender, _requiredAmount);
    }

    function withdrawGuarantee(uint256 _amount) external nonReentrant {
        require(memberCircle[msg.sender] == address(0), "Impossible: Vos fonds sont bloques dans une tontine active");
        require(memberGuarantees[msg.sender] >= _amount, "Solde de garantie insuffisant");

        memberGuarantees[msg.sender] -= _amount;

        bool success = IERC20(stableToken).transfer(msg.sender, _amount);
        require(success, "Echec du retrait");

        emit GuaranteeWithdrawn(msg.sender, _amount);
    }

    function refundGuarantee(address _member) external nonReentrant {
        require(msg.sender == memberCircle[_member], "Non autorise: Seul le cercle d'appartenance peut appeler");
        uint256 amount = memberGuarantees[_member];
        require(amount > 0, "Pas de garantie a rembourser");

        memberGuarantees[_member] = 0;
        memberCircle[_member] = address(0); 

        bool success = IERC20(stableToken).transfer(_member, amount);
        require(success, "Echec du remboursement");

        emit GuaranteeRefunded(_member, amount);
    }

    function slashGuarantee(address _member, address _victim) external nonReentrant {
        require(msg.sender == memberCircle[_member], "Non autorise: Seul le cercle peut slasher");
        uint256 amount = memberGuarantees[_member];
        require(amount > 0, "Pas de garantie a confisquer");

        memberGuarantees[_member] = 0;
        memberCircle[_member] = address(0); 

        uint256 houseShare = (amount * 20) / 100; 
        uint256 victimShare = amount - houseShare; 

        bool successHouse = IERC20(stableToken).transfer(houseTreasury, houseShare);
        require(successHouse, "Echec du versement des frais de risque a la Maison");

        if (_victim != address(0) && victimShare > 0) {
            bool successVictim = IERC20(stableToken).transfer(_victim, victimShare);
            require(successVictim, "Echec de l'indemnisation de la victime");
        }

        emit GuaranteeSlashed(_member, _victim, amount);
    }
}