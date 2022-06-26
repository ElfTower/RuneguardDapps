# Runeguard Dapps
This repository contains the Runeguard Dapps deployed on the Oasis blockchain.

## Requirements
This repo requires [TypeScript](https://www.typescriptlang.org/) and [Hardhat](https://hardhat.org/)

## Getting Started
Install the dependencies:
```console
npm install
```

Compile the smart contracts:
```console
npm run build
```

Test the smart contracts:
```console
npm test
```

Get the signer address you will be deploying from on the testnet:
```console
npm run get-testnet-signer-address
```

Get the signer address you will be deploying from on the mainnet:
```console
npm run get-signer-address
```

You're ready to go! Follow the instructions below to deploy.

## Runeguard Copper ERC-20 Token
The Runeguard Copper token is the native utility token for Runeguard.

To deploy it on the testnet, enter:
```console
npm run deploy-token-testnet
```

To deploy it on the mainnet, enter:
```console
npm run deploy-token
```

## Runeguard Vesting Wallet
The Runeguard vesting wallet is what's used to unlock tokens over time.

Prior to deploying on the TESTNET edit `scripts/DeployVestingWallet.ts` and set the variables `beneficiary`, `start`, and `duration`.

To deploy it on the testnet, enter:
```console
npm run build
npm run deploy-vesting-wallet-testnet
```

Prior to deploying on the MAINNET edit `scripts/DeployVestingWallet.ts` and set the variables `beneficiary`, `start`, and `duration`.

To deploy it on the mainnet, enter:
```console
npm run build
npm run deploy-vesting-wallet
```