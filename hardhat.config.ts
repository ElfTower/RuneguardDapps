import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

require('@nomiclabs/hardhat-truffle5');

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.8",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: true
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.ROPSTEN_PRIVATE_KEY !== undefined ? [process.env.ROPSTEN_PRIVATE_KEY] : []
    },
    emerald: {
      url: process.env.OASIS_EMERALD_URL || "",
      chainId: 42262,
      ///from: "0x9F65E6b4B0Fd5D686b4461dcCC048D3B2D04cE30",
      accounts:
      {
        mnemonic: process.env.OASIS_EMERALD_MNEMONIC || "",
        //process.env.OASIS_EMERALD_PRIVATE_KEY !== undefined ? [process.env.OASIS_EMERALD_PRIVATE_KEY] : []
      }
    },
    emerald_testnet: {
      url: process.env.OASIS_EMERALD_TESTNET_URL || "",
      accounts:
        process.env.OASIS_EMERALD_TESTNET_PRIVATE_KEY !== undefined ? [process.env.OASIS_EMERALD_TESTNET_PRIVATE_KEY] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;
