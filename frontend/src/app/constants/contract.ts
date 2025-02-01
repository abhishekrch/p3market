import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { client } from "../client";

export const p3MarketContractAddress = "0xEE0faF65adFdaEc23b28F2DE1268B5189Ef00bf4";
export const tokenContractAddress = "0x1D29C61A86e90e4BC8ebD30dD020c53279Fa5A98";

export const p3MarketContract = getContract({
    client: client,
    chain: baseSepolia,
    address: p3MarketContractAddress
})

export const tokenContract = getContract({
    client: client,
    chain: baseSepolia,
    address: tokenContractAddress
})