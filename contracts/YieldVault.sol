// SPDX-License-Identifier: MIT
pragma solidity 0.8.35;

import "./interfaces/IERC20.sol";

contract YieldVault {
    address public immutable houseTreasury;
    address public immutable stableToken; // Adresse du stablecoin (ex: USDC)
    address public owner; // Gestionnaire / Stratège autorisé
    
    mapping(address => uint256) public depositedBalances;
    mapping(address => uint256) public userYieldGains; // Suivi des gains d'intérêts réels
    bool private locked;

    event FundsDeposited(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);
    event YieldRecorded(address indexed user, uint256 yieldAmount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier nonReentrant() {
        require(!locked, "Reentrance detectee");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Non autorise: Reserve au proprietaire");
        _;
    }

    constructor(address _houseTreasury, address _stableToken) {
        require(_houseTreasury != address(0), "Adresse Treasury invalide");
        require(_stableToken != address(0), "Adresse StableToken invalide");
        houseTreasury = _houseTreasury;
        stableToken = _stableToken;
        owner = msg.sender; // Le déployeur devient le gestionnaire initial
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Adresse invalide");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function depositToYield(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Montant invalide");
        depositedBalances[msg.sender] += _amount;

        // Transfert sécurisé du stablecoin depuis l'utilisateur (nécessite un approve préalable)
        bool success = IERC20(stableToken).transferFrom(msg.sender, address(this), _amount);
        require(success, "Echec du transfert du stablecoin");

        emit FundsDeposited(msg.sender, _amount);
    }

    /**
     * @notice Permet UNIQUEMENT au propriétaire / gestionnaire d'enregistrer des intérêts générés par la DeFi
     */
    function recordYield(address _user, uint256 _yieldAmount) external onlyOwner {
        userYieldGains[_user] += _yieldAmount;
        emit YieldRecorded(_user, _yieldAmount);
    }

    /**
     * @notice Retrait sécurisé en stablecoin : Le capital initial est rendu à 100%, 
     * et la commission de la Maison (10%) est prélevée UNIQUEMENT sur les intérêts.
     */
    function withdrawFromYield(uint256 _principalAmount, uint256 _yieldAmount) external nonReentrant {
        uint256 totalRequested = _principalAmount + _yieldAmount;
        require(depositedBalances[msg.sender] >= _principalAmount, "Solde de capital insuffisant");
        require(userYieldGains[msg.sender] >= _yieldAmount, "Solde de gains insuffisant");

        // Vérification de la liquidité physique du contrat
        require(IERC20(stableToken).balanceOf(address(this)) >= totalRequested, "Liquidite insuffisante dans le coffre");

        depositedBalances[msg.sender] -= _principalAmount;
        userYieldGains[msg.sender] -= _yieldAmount;

        // Prélèvement de 10% de commission uniquement sur le gain d'intérêt
        uint256 houseCut = (_yieldAmount * 10) / 100; 
        uint256 userFinalPayout = totalRequested - houseCut;

        if (houseCut > 0) {
            bool successHouse = IERC20(stableToken).transfer(houseTreasury, houseCut);
            require(successHouse, "Echec commission Maison");
        }

        bool successUser = IERC20(stableToken).transfer(msg.sender, userFinalPayout);
        require(successUser, "Echec du retrait utilisateur");

        emit FundsWithdrawn(msg.sender, userFinalPayout);
    }

    /**
     * @notice Fonction de secours pour récupérer des tokens accidentellement envoyés sur le contrat
     */
    function rescueTokens(address _token, uint256 _amount) external onlyOwner {
        require(_token != stableToken, "Securite: Impossible de retirer le stableToken principal");
        bool success = IERC20(_token).transfer(msg.sender, _amount);
        require(success, "Echec du rescue");
    }
}