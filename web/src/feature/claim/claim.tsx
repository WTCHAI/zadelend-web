import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDepositStore } from "@/store/useDepositStore";
import { AssetNFTCard, NetworkCard } from "@/components/common/Cards/cards";
import { useProofStore } from "@/store/useProofStore";
import { toast } from "sonner";
import { useEffect } from "react";

type ClaimContentInfoProps = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  tokenIcon: string;
  overlayIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
};

export const ClaimContentInfo = ({
  value,
  from,
  to,
  tokenIcon,
  overlayIcon,
  networkIcon,
  isConnected,
  buttonLabel,
}: ClaimContentInfoProps) => {
  const { input ,output } = useProofStore();
  console.log("ClaimContentInfo output:", output);
  console.log(input);
  return (

    // const isProofReady =
    //   output?.proof?.pi_a &&
    //   output?.proof?.pi_b &&
    //   output?.proof?.pi_c &&
    //   Array.isArray(output?.publicSignals) &&
    //   output.publicSignals.length > 0;

    // return (
    //   <TabsContent
    //     value={value}
    //     className="space-y-6 transition-all duration-700"
    //   >
    //     <div className="flex flex-col bg-white/60 ring-1 hover:ring-2 ring-white/40 shadow-md backdrop-blur-3xl rounded-3xl p-5 hover:shadow-xl gap-4">
    //       <div className="flex w-full items-center justify-center ">
    //         <div className="text-sm font-semibold text-grayy-700 bg-white/80 rounded-xl p-4 text-center w-full">
    //           Proof your liquidity with Proof!!
    //         </div>
    //       </div>

    //       {isProofReady ? (
    //         <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
    //           <div>
    //             <Label>Public Signals</Label>
    //             <div className="bg-white/50 px-3 py-2 rounded-lg break-words">
    //               {output.publicSignals.join(", ")}
    //             </div>
    //           </div>
    //           <div>
    //             <Label>Proof A</Label>
    //             <div className="bg-white/50 px-3 py-2 rounded-lg break-words">
    //               {output.proof.pi_a.join(", ")}
    //             </div>
    //           </div>
    //           <div>
    //             <Label>Proof B</Label>
    //             <div className="bg-white/50 px-3 py-2 rounded-lg break-words">
    //               [{output.proof.pi_b[0].join(", ")}], [
    //               {output.proof.pi_b[1].join(", ")}]
    //             </div>
    //           </div>
    //           <div>
    //             <Label>Proof C</Label>
    //             <div className="bg-white/50 px-3 py-2 rounded-lg break-words">
    //               {output.proof.pi_c.join(", ")}
    //             </div>
    //           </div>
    //           {output.calldata && (
    //             <div>
    //               <Label>Calldata</Label>
    //               <div className="bg-white/50 px-3 py-2 rounded-lg break-words">
    //                 {JSON.stringify(output.calldata)}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       ) : (
    //         <div className="text-center text-gray-500 text-sm">
    //           No proof generated yet.
    //         </div>
    //       )}

    //       <Button
    //         className={cn(
    //           "w-full py-6 text-lg font-semibold rounded-2xl shadow-lg transition-all duration-300",
    //           isConnected
    //             ? "bg-link-primary/85 hover:bg-link-primary/95"
    //             : "bg-link-primary/40 text-black cursor-not-allowed opacity-85"
    //         )}
    //         disabled={!isConnected || !isProofReady}
    //         onClick={() => {
    //           if (!isConnected) {
    //             toast.error("Please connect your wallet.");
    //             return;
    //           }
    //           if (!isProofReady) {
    //             toast.warning("Proof data is incomplete.");
    //             return;
    //           }
    //           console.log("Executing claim with proof:", {
    //             pi_a: output.proof.pi_a,
    //             pi_b: output.proof.pi_b,
    //             pi_c: output.proof.pi_c,
    //             publicSignals: output.publicSignals,
    //             calldata: output.calldata,
    //           });
    //           // Your contract interaction goes here
    //         }}
    //       >
    //         <Wallet className="w-5 h-5 mr-2" />
    //         {isProofReady ? (
    //           <span>{buttonLabel}</span>
    //         ) : (
    //           <span>Proof Not Ready</span>
    //         )}
    //       </Button>
    //     </div>
    // </TabsContent>
    <></>
  );
};
