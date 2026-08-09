export const TontineFactoryABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_guaranteePool", "type": "address" },
      { "internalType": "address", "name": "_houseTreasury", "type": "address" },
      { "internalType": "address", "name": "_stableToken", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ContributionInvalide",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MontantInvalidePremium",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MontantInvalideStandard",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "MontantTropElevePourMicro",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "circleAddress", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "creator", "type": "address" },
      { "indexed": false, "internalType": "uint8", "name": "tier", "type": "uint8" },
      { "indexed": false, "internalType": "uint8", "name": "frequency", "type": "uint8" },
      { "indexed": false, "internalType": "uint256", "name": "contributionAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "guaranteeAmount", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "tourDuration", "type": "uint256" }
    ],
    "name": "CircleCreated",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "allCircles",
    "outputs": [
      { "internalType": "address", "name": "circleAddress", "type": "address" },
      { "internalType": "address", "name": "creator", "type": "address" },
      { "internalType": "uint8", "name": "tier", "type": "uint8" },
      { "internalType": "uint8", "name": "frequency", "type": "uint8" },
      { "internalType": "uint256", "name": "contributionAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "guaranteeAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "totalMembers", "type": "uint256" },
      { "internalType": "uint256", "name": "tourDuration", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint8", "name": "_tier", "type": "uint8" },
      { "internalType": "uint8", "name": "_frequency", "type": "uint8" },
      { "internalType": "uint256", "name": "_contributionAmount", "type": "uint256" }
    ],
    "name": "createCircle",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "creationFee",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCirclesCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "guaranteePool",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "houseTreasury",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stableToken",
    "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;