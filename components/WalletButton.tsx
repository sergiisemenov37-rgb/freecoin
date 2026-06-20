"use client";

import { useState } from "react";

export default function WalletButton() {
  const [wallet, setWallet] = useState("");

  async function connectWallet() {
    try {
      const provider = (window as any).phantom?.solana;

      if (!provider) {
        alert("Install Phantom Wallet");
        return;
      }

      const response = await provider.connect();
      const walletAddress = response.publicKey.toString();

      setWallet(walletAddress);
      localStorage.setItem("wallet", walletAddress);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={connectWallet}
        className="bg-white text-black px-8 py-4 rounded-xl font-bold"
      >
        Connect Phantom
      </button>

      {wallet && (
        <p className="text-green-400 break-all max-w-xl">
          {wallet}
        </p>
      )}
    </div>
  );
}