import { TokenIcon, TokenPairIcon } from "@/components/common/Tokens/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDepositStore } from "@/store/useDepositStore";

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
  const {
    tokenId,
    ContractFactoryAddress,
    nonce,
    nullifier,
    setTokenId,
    setContractFactoryAddress,
    setNonce,
    setNullifier,
  } = useDepositStore();

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
              onChange={(e) => setTokenId(e.target.value)}
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
          value={ContractFactoryAddress}
          disabled={true}
          onChange={(e) => setContractFactoryAddress(e.target.value)}
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
