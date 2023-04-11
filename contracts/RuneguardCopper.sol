// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./MintingPausable.sol";

/// @custom:security-contact ncoonrod@elftower.net
contract RuneguardCopper is ERC20Capped, ERC20Burnable, ERC20Snapshot, Ownable, Pausable, MintingPausable
{
    constructor() ERC20("Copper", "DORF") ERC20Capped (350000000 * 10 ** decimals())
    {
    }

    function snapshot() public onlyOwner
    {
        _snapshot();
    }

    function pause() public onlyOwner
    {
        _pause();
    }

    function unpause() public onlyOwner
    {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner
    {
        _mint(to, amount);
    }

    function _mint(address account, uint256 amount)
        internal
        whenMintingNotPaused
        override (ERC20, ERC20Capped)
    {
        super._mint (account, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
