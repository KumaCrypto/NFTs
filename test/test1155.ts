/* eslint-disable prettier/prettier */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyPenguins1155, MyPenguins1155__factory } from "../typechain-types";

// Some constants for testing
const ID: number = 1;
const AMOUNT: number = 1;
const NEW_URI: string = "https://google.com/";
const IDs: number[] = [1, 2];
const AMOUNTs: number[] = [1, 2];
const BaseURI: string = "ipfs://QmPhibD3B9FcGCsyNNkFy7X9PtH2Hv6P13vpxdexhgkH6e/";

describe("1155", function () {
    let contract: MyPenguins1155;
    let signers: SignerWithAddress[];

    beforeEach(async function () {
        signers = await ethers.getSigners();
        contract = await new MyPenguins1155__factory(signers[0]).deploy();
    });

    describe("URI", () => {
        it("returned correct uri", async () => {
            await contract.mint(signers[0].address, ID, AMOUNT, "0x00");
            const returnedURI = await contract.uri(ID);
            expect(
                `${BaseURI}${ID}.json`).to.eq(returnedURI);
        });
    });

    describe("setURI", () => {
        it("setURI change URI", async () => {
            await contract.setURI(NEW_URI);
            const URIAfter = await contract.uri(ID);
            expect(`${NEW_URI}1.json`).to.eq(URIAfter);
        });
    });

    describe("mintBatch", () => {
        it("mint is correct", async () => {
            const addresses = [signers[0].address, signers[0].address];

            await contract.mintBatch(addresses[0], IDs, AMOUNTs, "0x00");
            const balance = await contract.balanceOfBatch(addresses, IDs);
            
            expect(balance[0]).to.eq(ethers.BigNumber.from(AMOUNTs[0]));
            expect(balance[1]).to.eq(ethers.BigNumber.from(AMOUNTs[1]));
        });
    });
});
