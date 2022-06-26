// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Prior to deployment, set the beneficiary address here, along with the start timestamp and duration.
  const beneficiary: string = "";
  const start = ethers.BigNumber.from (null);
  const duration = ethers.BigNumber.from (null);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const RuneguardVestingWallet = await ethers.getContractFactory("RuneguardVestingWallet");
  const vestingWallet = await RuneguardVestingWallet.deploy(beneficiary, start, duration);

  await vestingWallet.deployed();

  console.log("RuneguardVestingWallet deployed to:", vestingWallet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
