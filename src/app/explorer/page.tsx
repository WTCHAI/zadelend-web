"use client";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Hash,
  Loader,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

type Transaction = {
  hash: string;
  from: string;
  to: string;
  value: string;
  status: "Pending" | "Confirmed" | "Failed";
  blockNumber?: number;
  timestamp?: string;
  gasUsed?: string;
};

const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "Confirmed":
      return {
        color: "text-green-600 bg-green-50 border-green-200",
        icon: CheckCircle,
      };
    case "Pending":
      return {
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        icon: Loader,
      };
    case "Failed":
      return {
        color: "text-red-600 bg-red-50 border-red-200",
        icon: XCircle,
      };
    default:
      return {
        color: "text-gray-600 bg-gray-50 border-gray-200",
        icon: Clock,
      };
  }
};

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { color, icon: StatusIcon } = getStatusConfig(transaction.status);

  const handleCCIPRedirect = () => {
    const ccipUrl = `https://ccip.chain.link/#/side-drawer/msg/${1}`;
    window.open(ccipUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Hash className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Transaction</h3>
            <code className="text-sm text-gray-500 font-mono">
              {truncateAddress(transaction.hash)}
            </code>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${color}`}
        >
          <StatusIcon className="h-3 w-3" />
          <span>{transaction.status}</span>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 mb-1">
                From Address
              </div>
              <code className="text-sm font-mono bg-gray-50 px-2 py-1 rounded text-gray-800 break-all">
                {transaction.from}
              </code>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ArrowRight className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 mb-1">
                To Address
              </div>
              <code className="text-sm font-mono bg-gray-50 px-2 py-1 rounded text-gray-800 break-all">
                {transaction.to}
              </code>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-yellow-400 rounded-full mt-0.5 flex items-center justify-center">
              <span className="text-xs font-bold text-white">Ξ</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Value
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {transaction.value}
              </div>
            </div>
          </div>

          {transaction.blockNumber && (
            <div className="text-sm text-gray-500 space-y-1">
              <div>Block: #{transaction.blockNumber.toLocaleString()}</div>
              {transaction.timestamp && (
                <div>Time: {transaction.timestamp}</div>
              )}
              {transaction.gasUsed && (
                <div>Gas Used: {transaction.gasUsed}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Transaction Hash */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Transaction Hash
            </div>
            <code className="text-xs font-mono text-gray-600 break-all">
              {transaction.hash}
            </code>
          </div>
          <button
            onClick={handleCCIPRedirect}
            className="flex items-center space-x-2 bg-grayy-950 text-white px-4 py-2 rounded-lg hover:bg-grayy-900 duration-300 transition-colors text-sm font-medium cursor"
          >
            <span>View on CCIP</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 p-2 rounded-lg w-10 h-10"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  // useAccount();
  useEffect(() => {
    // (async () => {
    //   await getDepositLog(address as Address);
    // })();

    setTimeout(() => {
      setTransactions([
        {
          hash: "0xabc...",
          from: "0xSender...",
          to: "0xReceiver...",
          value: "1.2 ETH",
          status: "Confirmed",
          blockNumber: 123456,
          timestamp: "2025-06-29 14:30",
          gasUsed: "21,000",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Absolute Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full bg-gray-50 [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {loading && <LoadingState />}

          {!loading && transactions.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Transaction Explorer ({transactions.length})
                </h2>
                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 500);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Refresh
                </button>
              </div>
              <div className="space-y-6">
                {transactions.map((transaction, index) => (
                  <TransactionCard
                    key={`${transaction.hash}-${index}`}
                    transaction={transaction}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && transactions.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Hash className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Transactions Found
              </h3>
              <p className="text-gray-500 mb-4">
                No transaction data available at the moment.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
