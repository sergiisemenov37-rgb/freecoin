"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CreateFundraiser() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(100);
  const [recipientWallet, setRecipientWallet] = useState("");

  async function createFundraiser() {
    const wallet = localStorage.getItem("wallet");

    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    const { error } = await supabase
      .from("fundraisers")
      .insert([
        {
          title,
          description,
          goal,
          wallet,
          recipient_wallet: recipientWallet,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Ошибка создания");
    } else {
      alert("Сбор создан");

      setTitle("");
      setDescription("");
      setGoal(100);
      setRecipientWallet("");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-center mb-12">
        Create Fundraiser
      </h1>

      <div className="max-w-2xl mx-auto border border-zinc-800 rounded-3xl p-8 bg-zinc-950">

        <div className="flex flex-col gap-4">

          <input
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            placeholder="Fundraiser title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 min-h-[150px]"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            placeholder="Goal Amount"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
          />

          <input
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
            placeholder="Recipient Wallet (Solana)"
            value={recipientWallet}
            onChange={(e) => setRecipientWallet(e.target.value)}
          />

          <button
            onClick={createFundraiser}
            className="bg-green-600 hover:bg-green-500 rounded-xl p-4 font-bold"
          >
            Create Fundraiser
          </button>

        </div>

      </div>

    </main>
  );
}