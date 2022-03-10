/* eslint-disable prettier/prettier */
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const contract = await ethers.getContractFactory("MyPenguins1155");
  const MyPenguins = await contract.deploy();

  await MyPenguins.deployed();

  console.log(`
    Deploying 
    =================
    "MyPenguins1155" contract address: ${MyPenguins.address}
    ${await MyPenguins.provider
      .getSigner()
      .getAddress()} - deployed this contract
    Deployed to block: ${await ethers.provider.getBlockNumber()}
  `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
