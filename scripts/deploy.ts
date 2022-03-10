const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const contract = await ethers.getContractFactory("MyPenguins");
  const MyPenguins = await contract.deploy();

  await MyPenguins.deployed();

  console.log(`
    Deploying
    =================
    "MyPenguins" contract address: ${MyPenguins.address}
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
