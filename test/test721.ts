/* eslint-disable prettier/prettier */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyPenguins, MyPenguins__factory } from "../typechain-types";

// Some constants for testing
const URI = "ipfs://QmT4NyNxxnmM9GMWckpS7wfuXtnN7PVacHgdYLADr2DsBf";
const ID = 1;

describe("721", function () {
  let contract: MyPenguins;
  let signers: SignerWithAddress[];

  beforeEach(async function () {
    signers = await ethers.getSigners();
    contract = await new MyPenguins__factory(signers[0]).deploy();
  });

  // describe("Checking constants", () => {
  //   it("name", async () => {
  //     const tokenName = await contract.name();
  //     expect(tokenName).to.eq("MyPenguins");
  //   });
    
  //   it("symbol", async () => {
  //     const tokenSymbol = await contract.symbol();
  //     expect(tokenSymbol).to.eq("MPS");
  //   });
  // });

  // describe("safeMint", () => {
  //   it("onlyOwner", async () => {
  //     await expect(contract.connect(signers[1]).
  //       safeMint(signers[1].address, ID, URI)).to.be.revertedWith
  //         ("Ownable: caller is not the owner");
  //   });
  // });

  describe("tokenURI", () => {
    it("returned correct uri", async () => {
      await contract.safeMint(signers[1].address, ID, URI);
      const returnedURI = await contract.tokenURI(ID);
      expect(URI).to.eq(returnedURI);
    });
  });

  describe("burn", () => {
    it("token burned", async () => {
      await contract.safeMint(signers[0].address, ID, URI);
      const returnedURI = await contract.tokenURI(ID);
      expect(URI).to.eq(returnedURI);
      
      await contract.burn(ID);

      await expect(contract.tokenURI(ID)).to.be.revertedWith
      ("ERC721URIStorage: URI query for nonexistent token");
    });
  });
});
