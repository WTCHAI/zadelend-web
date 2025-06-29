import { Footer } from "@/components/common/Footer/footer";

import { Bitcoin, Shield, Zap, Droplets } from "lucide-react";
import Link from "next/link";

// Types
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorScheme: "red" | "green" | "blue" | "yellow" | "purple";
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
    hover: "hover:bg-purple-100/80",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    ring: "hover:ring-purple-400",
    titleText: "text-purple-700",
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
      className={`flex flex-col items-center justify-center rounded-2xl ${colors.bg} ${colors.hover} p-6 shadow-lg ring-1 ring-gray-200/50 hover:ring-1 hover:scale-[1.01] ${colors.ring} transition-all duration-300 md:min-h-[25vh]`}
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
      colorScheme: "purple" as const,
    },
    {
      icon: <Shield className="size-6" />,
      title: "Privacy-First",
      description:
        "Zero-knowledge proofs keep your transfers unlinkable and self-sovereign",
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
    <main className="flex flex-col justify-center items-center overflow-auto">
      {/* Hero Section with Pattern Background */}
      <div className="relative h-screen w-full">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full bg-link-backgroundlight [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <div></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="text-6xl md:text-9xl font-bold text-slate-700 flex flex-col mb-8">
              <span>Cross-Chain</span>
              <span className="block text-link-primary/90">Liquidity</span>
            </h1>
            <p className="mt-6 text-xl font-medium text-gray-500 max-w-3xl mx-auto mb-8">
              Cross-Chain Asset Collateralized enabling unlinkable, proof-based
              assets liquid across chains with complete user custody.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/deposit"
                className="rounded-lg px-6 py-2 font-medium bg-link-primary text-white hover:bg-link-primary/90"
              >
                Get Started
              </Link>
              <Link
                href="/workflow"
                className="rounded-lg border px-6 py-2 font-medium border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="flex flex-col gap-5 font-bold text-4xl lg:text-7xl items-center justify-center text-center bg-link-lightblue/10 md py-[20vh] w-full px-10 lg:px-40">
        <h2 className="text-3xl text-slate-600 px-5 block">
          Breaking the boundaries of traditional DeFi with
        </h2>
        <h2 className="text-link-primary/90 mb-10">Zero Knowledge Proofs</h2>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center lg:max-w-4xl">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
