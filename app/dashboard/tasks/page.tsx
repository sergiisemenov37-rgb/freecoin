"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function DashboardTasks() {
const [tasks, setTasks] = useState<any[]>([]);

useEffect(() => {
loadTasks();
}, []);

async function loadTasks() {
const wallet = localStorage.getItem("wallet");

if (!wallet) return;

const { data } = await supabase
  .from("tasks")
  .select("*")
  .eq("advertiser_wallet", wallet)
  .order("created_at", { ascending: false });

setTasks(data || []);

}

async function deleteTask(id: number) {
const confirmed = confirm(
"Delete this task?"
);

if (!confirmed) return;

await supabase
  .from("tasks")
  .delete()
  .eq("id", id);

loadTasks();

}

return ( <main className="min-h-screen bg-black text-white p-6"> <h1 className="text-5xl font-bold text-center mb-12">
My Tasks </h1>

  <div className="max-w-4xl mx-auto flex flex-col gap-6">

    {tasks.map((task) => (
      <div
        key={task.id}
        className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950"
      >
        <h2 className="text-2xl font-bold mb-4">
          {task.title}
        </h2>

        <p className="text-zinc-400 mb-2">
          Reward: {task.reward} FREE
        </p>

        <p className="text-zinc-400 mb-2">
          Completions: {task.completions}
        </p>

        <p className="text-zinc-400 mb-4">
          Budget: {task.budget}
        </p>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-600 px-4 py-2 rounded-xl"
        >
          Delete Task
        </button>
      </div>
    ))}

  </div>
</main>

);
}
