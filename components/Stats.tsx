"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Stats() {
  const [users, setUsers] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [paid, setPaid] = useState(0);
  const [fundraisers, setFundraisers] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: usersCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: tasksCount } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true });

    const { data: tasksData } = await supabase
      .from("tasks")
      .select("spent");

    const totalPaid =
      tasksData?.reduce(
        (sum, task) => sum + (task.spent || 0),
        0
      ) || 0;

    const { count: fundraiserCount } = await supabase
      .from("fundraisers")
      .select("*", { count: "exact", head: true });

    setUsers(usersCount || 0);
    setTasks(tasksCount || 0);
    setPaid(totalPaid);
    setFundraisers(fundraiserCount || 0);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-10 w-full max-w-5xl">

      <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
        <p className="text-zinc-500">Users</p>
        <p className="text-3xl font-bold text-green-400">
          {users}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
        <p className="text-zinc-500">Tasks</p>
        <p className="text-3xl font-bold text-blue-400">
          {tasks}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
        <p className="text-zinc-500">FREE Paid</p>
        <p className="text-3xl font-bold text-yellow-400">
          {paid}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
        <p className="text-zinc-500">Fundraisers</p>
        <p className="text-3xl font-bold text-pink-400">
          {fundraisers}
        </p>
      </div>

    </div>
  );
}