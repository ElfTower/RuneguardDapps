// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAccountBalance = (await deployer.getBalance());
  const accountBalance = ethers.utils.formatEther (weiAccountBalance);

  console.log("Account balance:", accountBalance.toString());

  const gasPrice: any = (await deployer.getFeeData ()).gasPrice;

  const RuneguardCopper = await ethers.getContractFactory("RuneguardCopper");
  console.log("Gas price:", gasPrice.toString ());

  const gweiValue = ethers.utils.formatEther (gasPrice);

  console.log("Gas price:", gweiValue.toString ());
  const copper = await RuneguardCopper.deploy ({ "gasPrice": gasPrice });

  await copper.deployed();

  console.log("RuneguardCopper deployed to:", copper.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
