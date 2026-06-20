"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ReferralsPage() {
  const [wallet, setWallet] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadReferrals();
  }, []);

  async function loadReferrals() {
    const savedWallet = localStorage.getItem("wallet");

    if (!savedWallet) return;

    setWallet(savedWallet);

    const { data } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_wallet", savedWallet);

    setCount(data?.length || 0);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-center mb-12">
        Referral Dashboard
      </h1>

      <div className="max-w-2xl mx-auto border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
        <p className="mb-4 text-zinc-400">
          Your Referral Link
        </p>

        <p className="text-blue-400 break-all mb-8">
          {wallet
            ? `${window.location.origin}/?ref=${wallet}`
            : ""}
        </p>

        <div className="text-center">
          <p className="text-6xl font-bold text-green-400">
            {count}
          </p>

          <p className="text-xl mt-4">
            Invited Users
          </p>

          <p className="text-yellow-400 mt-6 text-2xl">
            Earned: {count * 50} FREE
          </p>
        </div>
      </div>
    </main>
  );
}