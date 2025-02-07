'use client';

import { client } from "@/app/client";
import { tokenContractAddress } from "@/app/constants/contract";
import { useState } from "react";
import { baseSepolia } from "thirdweb/chains";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function Navbar() {
  const account = useActiveAccount();
  const [isClaiming, setIsClaiming] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">P3 Market</h1>
      <div className="items-center flex gap-2">
        {account && (
          <Button>
            {isClaiming ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Claiming...
              </>
            ) : (
              "Claim Tokens"
            )}
          </Button>
        )}
        <ConnectButton 
        client={client}
        theme={lightTheme()}
        chain={baseSepolia}
        connectButton={{
            label: "Sign In",
            style: {
                fontSize: '0.5rem !important',
                height: '2.5rem !important',
            }
        }}
        // wallets={[
        //     inAppWallet()
        // ]}
        // accountAbstraction={{
        //     chain: baseSepolia,
        //     sponsorGas: true,
        // }}
        detailsButton={{
            displayBalanceToken: {
                [baseSepolia.id]: tokenContractAddress
            }
        }}
        />
      </div>
    </div>
  );
}
