// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/finance/VestingWallet.sol";

/// @custom:security-contact ncoonrod@elftower.net
contract RuneguardVestingWallet is VestingWallet
{
    constructor (address beneficiaryAddress, uint64 startTimestamp, uint64 durationSeconds)
        VestingWallet (beneficiaryAddress, startTimestamp, durationSeconds)
    {
    }
}