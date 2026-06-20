"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdvertiserDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const savedWallet = localStorage.getItem("wallet");

    if (!savedWallet) {
      return;
    }

    setWallet(savedWallet);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("advertiser_wallet", savedWallet)
      .order("id", { ascending: false });

    if (!error && data) {
      setTasks(data);
    }
  }

  async function deleteTask(id: number) {
    const ok = confirm("Delete task?");

    if (!ok) return;

    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    loadTasks();
  }

  async function pauseTask(id: number) {
    await supabase
      .from("tasks")
      .update({
        status: "paused",
      })
      .eq("id", id);

    loadTasks();
  }

  async function activateTask(id: number) {
    await supabase
      .from("tasks")
      .update({
        status: "active",
      })
      .eq("id", id);

    loadTasks();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-center mb-10">
        Advertiser Dashboard
      </h1>

      <div className="max-w-6xl mx-auto">

        <div className="mb-8 border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
          <p className="text-zinc-400">
            Wallet
          </p>

          <p className="text-green-400 break-all mt-2">
            {wallet}
          </p>
        </div>

        <div className="grid gap-6">

          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950"
            >

              <div className="flex justify-between items-center flex-wrap gap-4">

                <div>

                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    {task.url}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-yellow-400 text-xl font-bold">
                    Reward: {task.reward}
                  </p>

                  <p className="text-green-400">
                    Budget: {task.budget || 0}
                  </p>

                  <p className="text-blue-400">
                    Completions: {task.completions || 0}
                  </p>

                  <p
                    className={
                      task.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {task.status}
                  </p>

                </div>

              </div>

              <div className="flex gap-3 mt-6">

                {task.status === "active" ? (
                  <button
                    onClick={() => pauseTask(task.id)}
                    className="bg-yellow-600 px-4 py-2 rounded-xl font-bold"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => activateTask(task.id)}
                    className="bg-green-600 px-4 py-2 rounded-xl font-bold"
                  >
                    Activate
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 px-4 py-2 rounded-xl font-bold"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center text-zinc-500 py-20">
              No tasks created yet
            </div>
          )}

        </div>

      </div>

    </main>
  );
}