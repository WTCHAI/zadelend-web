"use client";

import { Bitcoin, Shield, Zap, Droplets } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <section className="px-6 py-24 max-w-[80vw] mx-auto">
        <h1 className="text-9xl font-bold text-gray-900 flex flex-col">
          <span>Cross-Chain</span>
          <span className="block text-blue-600">Asset Liquidity</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
          Unlock liquidity from any asset across multiple chains. Transform the
          value of your assets into cross-chain liquidity with untraceable
          zk-proof technology.
        </p>

        <div className="mt-12 px-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-blue-50 hover:bg-blue-100/80 p-6 shadow-lg ring-1 ring-blue-200/50 hover:ring-2 hover:ring-blue-400 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">
                <Bitcoin className="size-6" />
              </div>
              <h3 className="text-xl text-blue-700 font-bold mb-2 mt-3">
                Multi-Asset Support
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Tokens, NFTs, and RWAs — unified into cross-chain liquidity.
            </p>
          </div>

          <div className="rounded-2xl bg-purple-50 hover:bg-purple-100/80 p-6 shadow-lg ring-1 ring-purple-200/50 hover:ring-2 hover:ring-purple-500 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600">
                <Shield className="size-6" />
              </div>
              <h3 className="text-xl text-purple-700 font-bold mb-2 mt-3">
                Privacy-First
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Zero-knowledge proofs keep your transfers untraceable and
              self-sovereign.
            </p>
          </div>

          <div className="rounded-2xl bg-teal-50 hover:bg-teal-100/80 p-6 shadow-lg ring-1 ring-teal-200/50 hover:ring-2 hover:ring-teal-500 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-600">
                <Droplets className="size-6" />
              </div>
              <h3 className="text-xl text-teal-700 font-bold">
                Seamless Liquidity
              </h3>
            </div>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              Access liquidity across chains without complex bridges or wrapped
              tokens.
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-50 hover:bg-yellow-100/80 p-6 shadow-lg ring-1 ring-yellow-200/50 hover:ring-2 hover:ring-yellow-400 transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-600">
                <Zap className="size-4" />
              </div>
              <h3 className="text-xl text-yellow-700 font-bold mb-2 mt-3">
                Instant Settlement
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Fast, automated execution with minimal gas — no trusted
              intermediaries.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start Liquidating Assets
          </button>
          <button className="ml-4 border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}
