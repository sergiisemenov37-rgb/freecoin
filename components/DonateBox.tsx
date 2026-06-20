"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DonateBox({
  fundraiserId,
  currentRaised,
}: {
  fundraiserId: number;
  currentRaised: number;
}) {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  async function donate() {
    const wallet = localStorage.getItem("wallet");

    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("donations")
      .insert({
        fundraiser_id: fundraiserId,
        donor_wallet: wallet,
        amount,
      });

    if (error) {
      console.error(error);
      alert("Donation error");
      setLoading(false);
      return;
    }

    await supabase
      .from("fundraisers")
      .update({
        raised: currentRaised + amount,
      })
      .eq("id", fundraiserId);

    alert(`Thank you for donating ${amount}`);

    location.reload();
  }

  return (
    <div className="space-y-4">

      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
      />

      <button
        onClick={donate}
        disabled={loading}
        className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl font-bold w-full"
      >
        {loading ? "Processing..." : "Donate"}
      </button>

    </div>
  );
}