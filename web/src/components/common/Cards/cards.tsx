import { TokenIcon, TokenPairIcon } from "@/components/common/Tokens/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SepoliaContract } from "@/lib/contract";
import { useDepositStore } from "@/store/useDepositStore";
import { useMintMockNFT } from "@/store/useMintMockStore";
import { ProofInput, useProofStore } from "@/store/useProofStore";
import { useEffect } from "react";

export const NetworkCard = ({
  name,
  icon,
  isSelected = false,
}: {
  name: string;
  icon: string;
  isSelected?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
      isSelected
        ? "border-blue-400 bg-blue-50/10"
        : "border-gray-200 bg-gray-50 hover:border-gray-300"
    }`}
  >
    <TokenIcon src={icon} alt={name} />
    <span
      className={`font-medium ${isSelected ? "text-white" : "text-gray-700"}`}
    >
      {name}
    </span>
  </div>
);

export const AmountCard = ({
  title,
  token,
  amount,
  onAmountChange,
  tokenIcon,
  networkIcon,
  placeholder = "0",
}: {
  title: string;
  token: string;
  amount: string;
  onAmountChange: (value: string) => void;
  tokenIcon: string;
  networkIcon: string;
  placeholder?: string;
}) => (
  <div className="bg-gray-50 p-6 rounded-2xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>

    <div className="flex items-center gap-4">
      <TokenPairIcon baseIcon={tokenIcon} overlayIcon={networkIcon} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-800">{token}</span>
        </div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder={placeholder}
          className="text-3xl font-bold text-gray-800 border-none bg-transparent p-0 h-auto focus:ring-0"
        />
      </div>
    </div>
  </div>
);

export const AssetCard = ({
  title,
  token,
  tokenIcon,
  networkIcon,
  placeholder = "Place your assets address here",
}: {
  title: string;
  token: string;
  tokenIcon: string;
  networkIcon: string;
  placeholder?: string;
}) => {
  const { tokenId, nonce, nullifier, setTokenId, setNonce, setNullifier } =
    useDepositStore();
  const { latestTokenId } = useMintMockNFT();
  return (
    <div className="bg-white/60 ring-1 hover:ring-2 ring-white/40 shadow-md backdrop-blur-3xl rounded-3xl p-6 space-y-6">
      <div>
        <h3 className="text-gray-700 font-semibold mb-4">{title}</h3>
        <div className="flex items-center gap-4">
          <TokenIcon src={tokenIcon} alt={token} className="size-6" />
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-gray-500 text-sm">NFT Address</Label>
            <Input
              type="text"
              value={tokenId}
              onChange={(e) => {
                setTokenId(e.target.value);
              }}
              placeholder={"place tokenId here"}
              className="text-base p-2 font-medium text-gray-800 border-none bg-white/80 rounded-lg shadow-sm w-full ring-none"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-gray-600 font-medium block mb-1">
          Contract Factory Address
        </Label>
        <Input
          type="text"
          value={SepoliaContract.nft}
          disabled={true}
          placeholder="0xFactoryAddress..."
          className="w-full bg-white/80 border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-600 font-medium block mb-1">Nonce</Label>
          <Input
            type="number"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
            placeholder="Random nonce"
            className="w-full bg-white/80 border border-gray-300 rounded-lg p-3 text-base"
          />
        </div>
        <div>
          <Label className="text-gray-600 font-medium block mb-1">
            Nullifier
          </Label>
          <Input
            type="number"
            value={nullifier}
            onChange={(e) => setNullifier(e.target.value)}
            placeholder="Unique nullifier"
            className="w-full bg-white/80 border border-gray-300 rounded-lg p-3 text-base"
          />
        </div>
      </div>
    </div>
  );
};

export const AssetNFTCard = ({
  title,
  token,
  tokenIcon,
  overlayIcon,
  networkIcon,
}: {
  title: string;
  token: string;
  tokenIcon: string;
  overlayIcon: string;
  networkIcon: string;
}) => {
  const { nonce, nullifier } = useDepositStore();
  const { input, setInput } = useProofStore();
  useEffect(() => {
    setInput({
      ...input,
      nonce: nonce,
      nullifier: nullifier || "",
      loanAmount: "100",
    } as ProofInput);
  }, []);
  return (
    <div className="bg-white/60 ring-1 hover:ring-2 ring-white/40 shadow-md backdrop-blur-3xl rounded-3xl p-6 space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-4 h-[60px]">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <NetworkCard
              name={"Sepolia ETH"}
              icon={networkIcon}
              isSelected={false}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-center items-start w-full">
          <Label className="text-gray-500 text-sm font-medium">
            Assets Value
          </Label>
          <Input
            type="text"
            value="100"
            disabled
            className="text-left font-medium text-lg bg-white/80 rounded-lg px-4 py-2 border border-gray-300 w-full shadow-sm "
          />
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4 h-[60px]">
        <div className="h-full">
          <Label className="text-gray-600 font-medium block mb-1">Nonce</Label>
          <Input
            type="number"
            value={input?.nonce ?? 0}
            onChange={(e) => {
              setInput({
                ...input,
                nonce: e.target.value.toString(),
              } as ProofInput);
            }}
            placeholder="Random nonce"
            className="w-full bg-white/80 border border-gray-300 rounded-lg p-3 text-base shadow-inner"
          />
        </div>
        <div className="h-full">
          <Label className="text-gray-600 font-medium block mb-1">
            Nullifier
          </Label>
          <Input
            type="number"
            value={input?.nullifier ?? 0}
            onChange={(e) => {
              setInput({
                ...input,
                nullifier: e.target.value.toString(),
              } as ProofInput);
            }}
            placeholder="Unique nullifier"
            className="w-full bg-white/80 border border-gray-300 rounded-lg p-3 text-base shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};
