// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TontineCircle.sol";
import "./GuaranteePool.sol";
import "./interfaces/IERC20.sol";

contract TontineFactory {
    enum TontineTier { Micro, Standard, Premium }
    enum Frequency { FourDays, FourWeeks, FourMonths }

    struct CircleInfo {
        address circleAddress;
        address creator;
        TontineTier tier;
        Frequency frequency;
        uint256 contributionAmount;
        uint256 guaranteeAmount;
        uint256 totalMembers;
        uint256 tourDuration;
    }

    CircleInfo[] public allCircles;
    address public immutable guaranteePool;
    address public immutable houseTreasury; 
    address public immutable stableToken; // Adresse du stablecoin (ex: USDC)
    
    // Frais de création de la Maison (ex: 1 USDC avec 6 décimales)
    uint256 public creationFee = 1 * 10**6; 

    event CircleCreated(
        address indexed circleAddress,
        address indexed creator,
        TontineTier tier,
        Frequency frequency,
        uint256 contributionAmount,
        uint256 guaranteeAmount,
        uint256 tourDuration
    );

    constructor(address _guaranteePool, address _houseTreasury, address _stableToken) {
        require(_guaranteePool != address(0), "Adresse GuaranteePool invalide");
        require(_houseTreasury != address(0), "Adresse Treasury invalide");
        require(_stableToken != address(0), "Adresse StableToken invalide");
        guaranteePool = _guaranteePool;
        houseTreasury = _houseTreasury;
        stableToken = _stableToken;
    }

    function createCircle(
        TontineTier _tier,
        Frequency _frequency,
        uint256 _contributionAmount
    ) external returns (address) {
        require(_contributionAmount > 0, "Cotisation invalide");
        
        // Validation des montants selon le Tier (Basé sur les décimales de l'USDC : 6 décimales)
        if (_tier == TontineTier.Micro) {
            require(_contributionAmount <= 50 * 10**4, "Montant trop eleve pour Micro (max 0.50 USDC)"); 
        } else if (_tier == TontineTier.Standard) {
            require(_contributionAmount > 50 * 10**4 && _contributionAmount <= 5 * 10**6, "Montant hors limites Standard (0.50 a 5 USDC)"); 
        } else if (_tier == TontineTier.Premium) {
            require(_contributionAmount > 5 * 10**6, "Montant trop faible pour Premium (min > 5 USDC)"); 
        }

        uint256 _tourDuration;
        if (_frequency == Frequency.FourDays) {
            _tourDuration = 4 days;
        } else if (_frequency == Frequency.FourWeeks) {
            _tourDuration = 28 days;
        } else if (_frequency == Frequency.FourMonths) {
            _tourDuration = 120 days;
        }

        uint256 _totalMembers = 4;
        
        // RÈGLE IMMUABLE : Calcul automatique de la garantie totale exigée
        uint256 _guaranteeAmount = _contributionAmount * _totalMembers;

        // Prélèvement des frais de création de la Maison en stablecoin (nécessite un approve préalable)
        bool successFee = IERC20(stableToken).transferFrom(msg.sender, houseTreasury, creationFee);
        require(successFee, "Echec du paiement des frais de creation a la Maison");

        // Déploiement sécurisé du nouveau cercle
        TontineCircle newCircle = new TontineCircle(
            _contributionAmount,
            _totalMembers,
            _tourDuration,
            guaranteePool,
            msg.sender,
            stableToken
        );

        address circleAddress = address(newCircle);

        allCircles.push(CircleInfo({
            circleAddress: circleAddress,
            creator: msg.sender,
            tier: _tier,
            frequency: _frequency,
            contributionAmount: _contributionAmount,
            guaranteeAmount: _guaranteeAmount,
            totalMembers: _totalMembers,
            tourDuration: _tourDuration
        }));

        emit CircleCreated(
            circleAddress,
            msg.sender,
            _tier,
            _frequency,
            _contributionAmount,
            _guaranteeAmount,
            _tourDuration
        );

        return circleAddress;
    }

    /**
     * @notice Retourne le nombre total de cercles créés via la factory.
     */
    function getCirclesCount() external view returns (uint256) {
        return allCircles.length;
    }
}