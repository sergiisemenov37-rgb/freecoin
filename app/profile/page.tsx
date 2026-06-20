"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [wallet, setWallet] = useState("");
  const [points, setPoints] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const savedWallet = localStorage.getItem("wallet");

    if (!savedWallet) return;

    setWallet(savedWallet);

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("wallet", savedWallet)
      .single();

    if (user) {
      setPoints(user.points || 0);
    }

    const { data: referralsData } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_wallet", savedWallet);

    setReferrals(referralsData?.length || 0);

    const { data: tasksData } = await supabase
      .from("task_completions")
      .select("*")
      .eq("wallet", savedWallet);

    setCompletedTasks(tasksData?.length || 0);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-center mb-12">
        User Profile
      </h1>

      <div className="max-w-5xl mx-auto">

        <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-6 mb-8">
          <p className="text-zinc-500 mb-2">
            Wallet
          </p>

          <p className="text-green-400 break-all">
            {wallet}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 text-center">
            <p className="text-zinc-500">
              FREE Points
            </p>

            <p className="text-5xl font-bold text-yellow-400 mt-4">
              {points}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 text-center">
            <p className="text-zinc-500">
              Referrals
            </p>

            <p className="text-5xl font-bold text-blue-400 mt-4">
              {referrals}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 text-center">
            <p className="text-zinc-500">
              Tasks Completed
            </p>

            <p className="text-5xl font-bold text-green-400 mt-4">
              {completedTasks}
            </p>
          </div>

        </div>

        <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6">
            Statistics
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Total Points Earned</span>
              <span className="text-yellow-400">
                {points}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Invited Users</span>
              <span className="text-blue-400">
                {referrals}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed Tasks</span>
              <span className="text-green-400">
                {completedTasks}
              </span>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}