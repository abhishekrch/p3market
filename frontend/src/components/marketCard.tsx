import { p3MarketContract } from "@/app/constants/contract";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MarketTime } from "./marketTime";
import { MarketProgress } from "./marketProgress";
import { MarketBuyInterface } from "./marketBuyInterface";

interface MarketCardProps {
  index: number;
  filter: "active" | "pending" | "resolved";
}

interface Market {
  question: string;
  optionA: string;
  optionB: string;
  endTime: bigint;
  outcome: number;
  totalOptionAShares: bigint;
  totalOptionBShares: bigint;
  resolved: boolean;
}

interface SharesBalance {
  optionAShares: bigint;
  optionBShares: bigint;
}

export function MarketCard({ index, filter }: MarketCardProps) {
  const account = useActiveAccount();

  const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
    contract: p3MarketContract,
    method:
      "function getMarketInfo(uint256 _marketId) view returns (string question, string optionA, string optionB, uint256 endTime, uint8 outcome, uint256 totalOptionAShares, uint256 totalOptionBShares, bool resolved)",
    params: [BigInt(index)],
  });

  const market: Market | undefined = marketData
    ? {
        question: marketData[0],
        optionA: marketData[1],
        optionB: marketData[2],
        endTime: marketData[3],
        outcome: marketData[4],
        totalOptionAShares: marketData[5],
        totalOptionBShares: marketData[6],
        resolved: marketData[7],
      }
    : undefined;

  const { data: sharesBalanceData } = useReadContract({
    contract: p3MarketContract,
    method:
      "function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares)",
    params: [BigInt(index), account?.address as string],
  });

  const sharesBalance: SharesBalance | undefined = sharesBalanceData
    ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1],
      }
    : undefined;

  const isExpired = new Date(Number(market?.endTime) * 1000) < new Date();
  const isResolved = market?.resolved;

  const shouldShow = () => {
    if (!market) return false;

    switch (filter) {
      case "active":
        return !isExpired;
      case "pending":
        return isExpired && !isResolved;
      case "resolved":
        return isExpired && isResolved;
      default:
        return true;
    }
  };

  if (!shouldShow()) {
    return null;
  }

  return (
    <Card key={index} className="flex flex-col">
      {isLoadingMarketData ? (
        <></>
      ) : (
        <>
          <CardHeader>
            <MarketTime endTime={market?.endTime!} />
            <CardTitle>{market?.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {market && (
              <MarketProgress
                optionA={market.optionA}
                optionB={market.optionB}
                totalOptionAShares={market.totalOptionAShares}
                totalOptionBShares={market.totalOptionBShares}
              />
            )}
            {new Date(Number(market?.endTime) * 1000) < new Date() ? (
              market?.resolved ? (
                <></>
              ) : (
                <></>
              )
            ) : (
              <MarketBuyInterface marketId={index} market={market!} />
            )}
          </CardContent>
          <CardFooter>{market && sharesBalance && <></>}</CardFooter>
        </>
      )}
    </Card>
  );
}
