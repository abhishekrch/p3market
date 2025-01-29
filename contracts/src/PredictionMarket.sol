// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "@thirdweb-dev/contracts/eip/interface/IERC20.sol";
import {Ownable} from "@thirdweb-dev/contracts/extension/Ownable.sol";
import {ReentrancyGuard} from "@thirdweb-dev/contracts/external-deps/openzeppelin/security/ReentrancyGuard.sol";

contract PredictionMarket is Ownable, ReentrancyGuard{
    constructor() {}
}
