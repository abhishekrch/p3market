'use client';

import { client } from "@/app/client";
import { tokenContractAddress } from "@/app/constants/contract";
import { baseSepolia } from "thirdweb/chains";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">P3 Market</h1>
      <div className="items-center flex gap-2">
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
        wallets={[
            inAppWallet()
        ]}
        accountAbstraction={{
            chain: baseSepolia,
            sponsorGas: true,
        }}
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
