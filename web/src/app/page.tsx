import { Button } from "@/components/ui/button";
import {
  Bitcoin,
  Shield,
  Zap,
  Droplets,
  ArrowRight,
  Lock,
  Layers,
  Repeat,
} from "lucide-react";

// Types
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorScheme: "red" | "green" | "blue" | "yellow";
}

interface StepCardProps {
  icon: React.ReactNode;
  stepNumber: number;
  title: string;
  description: string;
  colorScheme: "blue" | "purple" | "teal";
}

// Color scheme configurations
const colorSchemes = {
  red: {
    bg: "bg-red-50",
    hover: "hover:bg-red-100/70",
    ring: "hover:ring-red-500",
    iconBg: "bg-red-100",
    iconText: "text-red-400",
    titleText: "text-red-500",
  },
  green: {
    bg: "bg-green-50",
    hover: "hover:bg-green-100/80",
    ring: "hover:ring-green-500",
    iconBg: "bg-green-500/10",
    iconText: "text-green-600",
    titleText: "text-green-700",
  },
  blue: {
    bg: "bg-blue-50",
    hover: "hover:bg-blue-100/80",
    ring: "hover:ring-blue-500",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-600",
    titleText: "text-blue-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    hover: "hover:bg-yellow-100/80",
    ring: "hover:ring-yellow-400",
    iconBg: "bg-yellow-500/10",
    iconText: "text-yellow-600",
    titleText: "text-yellow-700",
  },
  purple: {
    bg: "bg-purple-100",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
  },
  teal: {
    bg: "bg-teal-100",
    iconBg: "bg-teal-100",
    iconText: "text-teal-600",
  },
};

// Reusable Components
function FeatureCard({
  icon,
  title,
  description,
  colorScheme,
}: FeatureCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl ${colors.bg} ${colors.hover} p-6 shadow-lg ring-1 ring-gray-200/50 hover:ring-2 ${colors.ring} transition-all duration-300 md:min-h-[25vh]`}
    >
      <div
        className={`flex justify-center w-fit items-center gap-2 rounded-full ${colors.iconBg} px-3 py-1 text-xs font-semibold ${colors.iconText}`}
      >
        {icon}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <h3
          className={`text-2xl ${colors.titleText} font-bold mb-2 mt-3 transition-colors duration-300`}
        >
          {title}
        </h3>
      </div>
      <p className="text-base text-grayy-500 mb-4">{description}</p>
    </div>
  );
}

function StepCard({
  icon,
  stepNumber,
  title,
  description,
  colorScheme,
}: StepCardProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <div className="text-center">
      <div
        className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}
      >
        <div className={`w-10 h-10 ${colors.iconText}`}>{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {stepNumber}. {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// Main Component
export default function Home() {
  // Configuration data
  const features = [
    {
      icon: <Bitcoin className="size-6" />,
      title: "Multi-Asset Support",
      description:
        "Tokens, NFTs, and RWAs — unified into cross-chain liquidity",
      colorScheme: "red" as const,
    },
    {
      icon: <Shield className="size-6" />,
      title: "Privacy-First",
      description:
        "Zero-knowledge proofs keep your transfers untraceable and self-sovereign",
      colorScheme: "green" as const,
    },
    {
      icon: <Droplets className="size-6" />,
      title: "Seamless Liquidity",
      description:
        "Access liquidity across chains without complex bridges or wrapped tokens",
      colorScheme: "blue" as const,
    },
    {
      icon: <Zap className="size-6" />,
      title: "Instant Settlement",
      description:
        "Fast, automated execution with minimal gas — no trusted intermediaries",
      colorScheme: "yellow" as const,
    },
  ];

  const steps = [
    {
      icon: <Lock className="w-10 h-10" />,
      title: "Deposit Assets",
      description:
        "Connect your wallet and deposit any supported asset—tokens, NFTs, or real-world assets. Your assets are secured in our smart contract while maintaining full ownership rights.",
      colorScheme: "blue" as const,
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Generate ZK-Proof",
      description:
        "Our advanced zero-knowledge proof system generates cryptographic evidence of your asset ownership without revealing sensitive information, ensuring complete privacy.",
      colorScheme: "purple" as const,
    },
    {
      icon: <Repeat className="w-10 h-10" />,
      title: "Access Liquidity",
      description:
        "Instantly access liquidity on any supported chain. Trade, lend, or use your assets across ecosystems without complex bridges or wrapped tokens.",
      colorScheme: "teal" as const,
    },
  ];

  return (
    <main className="flex flex-col justify-center items-center">
      <section className="flex flex-col items-center justify-center h-screen text-center mx-auto px-6 bg-gradient-to-br from-link-backgroundlight to-blue-50`">
        <h1 className="text-6xl md:text-9xl font-bold text-slate-700 flex flex-col">
          <span>Cross-Chain</span>
          <span className="block text-link-primary/90">Liquidity</span>
        </h1>
        <p className="mt-6 text-xl font-medium text-gray-400 max-w-3xl">
          SEAMLESS DECENTRALIZED FINANCE
        </p>
      </section>

      {/* Features Section */}
      <div className="flex flex-col gap-5 font-bold text-4xl lg:text-7xl items-center justify-center text-center bg-link-lightblue/10 md py-[20vh] px-10 lg:px-40">
        <h2 className="text-slate-700">
          Transform the value of your assets into cross-chain
        </h2>
        <h2 className="text-link-primary/90 my-10">OWN-PROVE-MOVE</h2>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center lg:max-w-4xl">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        {/* CTA Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            Start Liquidating Assets
          </Button>
          <Button variant="default">Learn More</Button>
        </div>
      </div>

      {/* Steps Section */}
      <h2 className="block font-bold mt-24 text-3xl md:text-5xl text-gray-900/80 text-center">
        How It Works
      </h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-center">
        {steps.map((step, index) => (
          <StepCard key={index} stepNumber={index + 1} {...step} />
        ))}
      </div>
    </main>
  );
}
