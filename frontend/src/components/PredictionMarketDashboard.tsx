"use client";

import { useReadContract } from "thirdweb/react";
import { p3MarketContract } from "@/app/constants/contract";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import  Navbar  from "./Navbar";
import { MarketCardSkeleton } from './skletonCard';

export default function PredictionMarketDashboard() {
  const { data: marketCount, isLoading: isLoadingMarketCount } =
    useReadContract({
      contract: p3MarketContract,
      method: "function marketCount() view returns (uint256)",
      params: [],
    });

  const skeletonCards = Array.from({ length: 6 }, (_, i) => (
      <MarketCardSkeleton key={`skeleton-${i}`} />
  ));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4">
        <Navbar />
        <div className="mb-4">
          <img
            src="https://placehold.co/800x300"
            alt="Placeholder Banner"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending Resolution</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          {isLoadingMarketCount ? (
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {skeletonCards}
              </div>
            </TabsContent>
          ) : (
            <>
              <TabsContent value="active">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <></>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <></>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resolved">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: Number(marketCount) }, (_, index) => (
                    <></>
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
