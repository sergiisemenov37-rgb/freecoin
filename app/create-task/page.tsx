"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [url, setUrl] = useState("");
  const [reward, setReward] = useState(10);
  const [budget, setBudget] = useState(1000);

  async function createTask() {
    const wallet =
      localStorage.getItem("wallet");

    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          description,
          url,
          reward,
          budget,
          advertiser_wallet: wallet,
          status: "active",
        },
      ]);

    if (error) {
      console.error(error);
      alert("Ошибка");
    } else {
      alert("Task created");

      setTitle("");
      setDescription("");
      setUrl("");
      setReward(10);
      setBudget(1000);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-center mb-12">
        FREECOIN Advertiser Panel
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">

          <h2 className="text-3xl font-bold mb-6">
            Create Task
          </h2>

          <div className="flex flex-col gap-4">

            <input
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              placeholder="Task title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              placeholder="Task description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <input
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              placeholder="https://..."
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
            />

            <input
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              type="number"
              placeholder="Reward"
              value={reward}
              onChange={(e) =>
                setReward(
                  Number(e.target.value)
                )
              }
            />

            <input
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
              type="number"
              placeholder="Budget"
              value={budget}
              onChange={(e) =>
                setBudget(
                  Number(e.target.value)
                )
              }
            />

            <button
              onClick={createTask}
              className="bg-green-600 hover:bg-green-500 rounded-xl p-4 font-bold"
            >
              Publish Task
            </button>

          </div>
        </div>

        <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">

          <h2 className="text-3xl font-bold mb-6">
            Preview
          </h2>

          <div className="border border-zinc-700 rounded-2xl p-6">

            <div className="flex justify-between items-center">

              <div>
                <h3 className="text-xl font-bold">
                  {title ||
                    "Your Task Title"}
                </h3>

                <p className="text-zinc-500 mt-2 break-all">
                  {url ||
                    "https://your-link.com"}
                </p>

                <p className="text-zinc-400 mt-4">
                  {description ||
                    "Task description..."}
                </p>
              </div>

              <div className="text-yellow-400 font-bold text-xl">
                +{reward}
              </div>

            </div>

            <div className="mt-4 flex gap-4">

              <span className="text-yellow-400">
                Reward: {reward}
              </span>

              <span className="text-green-400">
                Budget: {budget}
              </span>

            </div>

          </div>

          <div className="mt-6 text-zinc-500">
            This is how users will see your task.
          </div>

        </div>

      </div>
    </main>
  );
}