"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function TasksList() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("status", "active")
      .gt("budget", 0)
      .order("id", { ascending: false });

    if (data) {
      setTasks(data);
    }
  }

  async function completeTask(task: any) {
    const wallet = localStorage.getItem("wallet");

    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    const { data: existing } = await supabase
      .from("task_completions")
      .select("*")
      .eq("wallet", wallet)
      .eq("task_id", task.id);

    if (existing && existing.length > 0) {
      alert("Task already completed");
      return;
    }

    const newSpent =
      (task.spent || 0) + task.reward;

    const newCompletions =
      (task.completions || 0) + 1;

    const newStatus =
      newSpent >= task.budget
        ? "completed"
        : "active";

    await supabase
      .from("task_completions")
      .insert({
        wallet,
        task_id: task.id,
      });

   await supabase
  .from("task_completions")
  .insert({
    wallet,
    task_id: task.id,
    status: "pending",
  });

alert(
  "Task submitted for review"
);

loadTasks();

return;

    loadTasks();

    if (task.url) {
      window.open(task.url, "_blank");
    }

    alert(`+${task.reward} FREE Points`);
  }

  return (
    <div className="w-full">

      <div className="flex flex-col gap-4">

        {tasks.map((task) => {

          const progress =
            task.budget > 0
              ? Math.min(
                  100,
                  Math.round(
                    ((task.spent || 0) /
                      task.budget) *
                      100
                  )
                )
              : 0;

          return (
            <div
              key={task.id}
              className="border border-zinc-800 rounded-2xl p-5 bg-zinc-950"
            >
              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold text-xl">
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-zinc-400 mt-2">
                      {task.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-4 text-sm">

                    <span className="text-yellow-400">
                      Reward: {task.reward} FREE
                    </span>

                    <span className="text-green-400">
                      Budget: {task.budget}
                    </span>

                    <span className="text-blue-400">
                      Spent: {task.spent || 0}
                    </span>

                    <span className="text-purple-400">
                      Completions:{" "}
                      {task.completions || 0}
                    </span>

                  </div>

                  <div className="mt-4 w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <p className="text-zinc-500 text-sm mt-2">
                    Progress: {progress}%
                  </p>

                </div>

                <button
                  onClick={() =>
                    completeTask(task)
                  }
                  className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded-xl font-bold"
                >
                  Complete
                </button>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}