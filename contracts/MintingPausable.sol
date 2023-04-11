// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (security/Pausable.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 * 
 * This is a modified Pausable contract from OpenZeppelin.
 */
abstract contract MintingPausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event MintingPaused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event MintingUnpaused(address account);

    bool private _mintingPaused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _mintingPaused = false;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenMintingNotPaused() {
        _requireNotMintingPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenMintingPaused() {
        _requireMintingPaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function mintingPaused() public view virtual returns (bool) {
        return _mintingPaused;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotMintingPaused() internal view virtual {
        require(!mintingPaused(), "MintingPausable: paused");
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requireMintingPaused() internal view virtual {
        require(mintingPaused(), "MintingPausable: not paused");
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _mintingPause() internal virtual whenMintingNotPaused {
        _mintingPaused = true;
        emit MintingPaused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _mintingUnpause() internal virtual whenMintingPaused {
        _mintingPaused = false;
        emit MintingUnpaused(_msgSender());
    }
}