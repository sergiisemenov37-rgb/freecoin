"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const savedWallet = localStorage.getItem("wallet");

    if (!savedWallet) return;

    setWallet(savedWallet);

    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("advertiser_wallet", savedWallet)
      .order("id", { ascending: false });

    setTasks(data || []);
  }

  const totalTasks = tasks.length;

  const totalCompletions = tasks.reduce(
    (sum, task) => sum + (task.completions || 0),
    0
  );

  const totalSpent = tasks.reduce(
    (sum, task) =>
      sum + ((task.completions || 0) * (task.reward || 0)),
    0
  );

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-center mb-12">
        Advertiser Dashboard
      </h1>

      <div className="max-w-6xl mx-auto">

        <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-6 mb-8">
          <p className="text-zinc-500">
            Wallet
          </p>

          <p className="text-green-400 break-all">
            {wallet}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 text-center">
            <p className="text-zinc-500">
              Tasks
            </p>

            <p className="text-5xl font-bold text-blue-400 mt-4">
              {totalTasks}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 text-center">
            <p className="text-zinc-500">
              Completions
            </p>

            <p className="text-5xl font-bold text-green-400 mt-4">
              {totalCompletions}
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 rounded-3xl p-8 text-center">
            <p className="text-zinc-500">
              FREE Spent
            </p>

            <p className="text-5xl font-bold text-yellow-400 mt-4">
              {totalSpent}
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    Reward: {task.reward} FREE
                  </p>

                  <p className="text-zinc-500">
                    Status: {task.status}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-green-400 text-2xl font-bold">
                    {task.completions || 0}
                  </p>

                  <p className="text-zinc-500">
                    completions
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}