import { Footer } from "@/components/common/Footer/footer";
import { Navbar } from "@/components/common/Navbar/Navbar";
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

  return (
    <main className="flex flex-col justify-center items-center overflow-auto bg-gradient-to-br from-link-backgroundlight to-blue-50">
      <section className="flex flex-col items-center justify-center h-screen text-center mx-auto px-6 `">
        <h1 className="text-6xl md:text-9xl font-bold text-slate-700 flex flex-col">
          <span>Cross-Chain</span>
          <span className="block text-link-primary/90">Liquidity</span>
        </h1>
        <p className="mt-6 text-xl font-medium text-gray-400 max-w-3xl">
          Cross-Chain Asset Collateralized Loan with ZK Withdrawal
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
      <Footer />
    </main>
  );
}
