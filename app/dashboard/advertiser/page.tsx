"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdvertiserDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const w = localStorage.getItem("wallet");

    if (w) {
      setWallet(w);
      loadTasks(w);
    }
  }, []);

  async function loadTasks(walletAddress: string) {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("advertiser_wallet", walletAddress)
      .order("id", { ascending: false });

    setTasks(data || []);
  }

  async function deleteTask(id: number) {
    const confirmed = confirm(
      "Delete this campaign?"
    );

    if (!confirmed) return;

    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    loadTasks(wallet);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold mb-10">
        📢 Advertiser Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-4 mb-10">

        <div className="border border-zinc-800 rounded-2xl p-5 bg-zinc-950">
          <p className="text-zinc-500">
            Campaigns
          </p>

          <p className="text-3xl font-bold text-green-400">
            {tasks.length}
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-5 bg-zinc-950">
          <p className="text-zinc-500">
            Active
          </p>

          <p className="text-3xl font-bold text-blue-400">
            {
              tasks.filter(
                (t) => t.status === "active"
              ).length
            }
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-5 bg-zinc-950">
          <p className="text-zinc-500">
            Pending
          </p>

          <p className="text-3xl font-bold text-yellow-400">
            {
              tasks.filter(
                (t) => t.status === "pending"
              ).length
            }
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-5 bg-zinc-950">
          <p className="text-zinc-500">
            Completed
          </p>

          <p className="text-3xl font-bold text-pink-400">
            {
              tasks.filter(
                (t) => t.status === "completed"
              ).length
            }
          </p>
        </div>

      </div>

      <div className="flex flex-col gap-4">

        {tasks.map((task) => (

          <div
            key={task.id}
            className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                <p className="text-zinc-500 mt-2">
                  {task.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-4">

                  <span className="text-green-400">
                    Budget: {task.budget}
                  </span>

                  <span className="text-yellow-400">
                    Reward: {task.reward}
                  </span>

                  <span className="text-blue-400">
                    Spent: {task.spent || 0}
                  </span>

                  <span className="text-pink-400">
                    Completions:{" "}
                    {task.completions || 0}
                  </span>

                </div>

                <div className="mt-3 flex gap-4">

                  <span>
                    Status:
                    <span className="ml-2 text-green-400">
                      {task.status}
                    </span>
                  </span>

                  <span>
                    Payment:
                    <span className="ml-2 text-yellow-400">
                      {task.payment_status ||
                        "unpaid"}
                    </span>
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}