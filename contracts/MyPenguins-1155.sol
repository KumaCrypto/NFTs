// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract MyPenguins1155 is ERC1155, Ownable {
    constructor()
        ERC1155("ipfs://QmPhibD3B9FcGCsyNNkFy7X9PtH2Hv6P13vpxdexhgkH6e/")
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function uri(uint _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                getURI(),
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}