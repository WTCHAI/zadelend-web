"use client"
import { Button } from "@/components/ui/button";
import { SetupLink } from "@/feature/deposit/setUpLink";
import React from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

type Props = {};

export default function page({}: Props) {
  const { address } = useAccount();
  return (
    <div>
      Set up link
      <Button
        onClick={async () => {
            if (!address) {
                toast.warning("Please connect your wallet first.");
                return;
            }
          await SetupLink(address);
        }}
      >
        Click to setup
      </Button>
    </div>
  );
}
