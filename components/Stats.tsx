"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Stats() {
const [users, setUsers] = useState(0);
const [tasks, setTasks] = useState(0);
const [paid, setPaid] = useState(0);
const [completions, setCompletions] = useState(0);

useEffect(() => {
loadStats();
}, []);

async function loadStats() {
const { count: usersCount } = await supabase
.from("users")
.select("*", { count: "exact", head: true });

const { count: tasksCount } = await supabase
  .from("tasks")
  .select("*", { count: "exact", head: true })
  .eq("status", "active");

const { count: completionsCount } = await supabase
  .from("task_completions")
  .select("*", { count: "exact", head: true });

const { data: tasksData } = await supabase
  .from("tasks")
  .select("spent");

const totalPaid =
  tasksData?.reduce(
    (sum, task) => sum + (task.spent || 0),
    0
  ) || 0;

setUsers(usersCount || 0);
setTasks(tasksCount || 0);
setPaid(totalPaid || 0);
setCompletions(completionsCount || 0);

}

return (

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-10 w-full max-w-5xl">

    <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950 hover:border-green-500 transition">
      <p className="text-zinc-500">👥 Users</p>
      <p className="text-3xl font-bold text-green-400">
        {users}
      </p>
    </div>

    <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950 hover:border-blue-500 transition">
      <p className="text-zinc-500">🎯 Active Tasks</p>
      <p className="text-3xl font-bold text-blue-400">
        {tasks}
      </p>
    </div>

    <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950 hover:border-yellow-500 transition">
      <p className="text-zinc-500">💰 FREE Paid</p>
      <p className="text-3xl font-bold text-yellow-400">
        {paid}
      </p>
    </div>

    <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950 hover:border-pink-500 transition">
      <p className="text-zinc-500">🏆 Completions</p>
      <p className="text-3xl font-bold text-pink-400">
        {completions}
      </p>
    </div>

  </div>
);
}