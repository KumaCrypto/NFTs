/* eslint-disable prettier/prettier */
import { task } from "hardhat/config";

const contractAddress = "0x84307E8a20e9e58269d95c3F8b4420be9E7d8FB8";

task("mint", "mint your ERC-721 token")
  .addParam("to", "The address that will receive the token")
  .addParam("id", "Select token id")
  .addParam("uri", "Token URI")
  .setAction(async function (taskArgs, hre) {
    const token = await hre.ethers.getContractAt("MyPenguins", contractAddress);
    await token.safeMint(taskArgs.to, taskArgs.id, taskArgs.uri);
});