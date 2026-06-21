"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const ADMIN_WALLET =
  "HhZz13BAsk4peMTL1mwqu7yF2eCZJbS8NfJY5SfoApZ2";

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);

  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [completions, setCompletions] =
    useState<any[]>([]);
  const [referrals, setReferrals] =
    useState<any[]>([]);

  useEffect(() => {
    const wallet =
      localStorage.getItem("wallet");

    if (wallet === ADMIN_WALLET) {
      setAllowed(true);
      loadData();
    }
  }, []);

  async function loadData() {
    const { data: usersData } =
      await supabase
        .from("users")
        .select("*");

    const { data: tasksData } =
      await supabase
        .from("tasks")
        .select("*")
        .order("id", {
          ascending: false,
        });

    const { data: completionsData } =
      await supabase
        .from("task_completions")
        .select("*")
        .order("id", {
          ascending: false,
        });

    const { data: referralsData } =
      await supabase
        .from("referrals")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setUsers(usersData || []);
    setTasks(tasksData || []);
    setCompletions(
      completionsData || []
    );
    setReferrals(
      referralsData || []
    );
  }

  async function deleteTask(
    id: number
  ) {
    const ok =
      confirm("Delete task?");

    if (!ok) return;

    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    loadData();
  }
async function rejectCompletion(
  id: number
) {
  await supabase
    .from("task_completions")
    .update({
      status: "rejected",
    })
    .eq("id", id);

  loadData();
}
  async function pauseTask(
    id: number
  ) {
    await supabase
      .from("tasks")
      .update({
        status: "paused",
      })
      .eq("id", id);

    loadData();
  }
async function approveCompletion(
  completion: any
) {
  const { data: task } =
    await supabase
      .from("tasks")
      .select("*")
      .eq("id", completion.task_id)
      .single();

  const { data: user } =
    await supabase
      .from("users")
      .select("*")
      .eq("wallet", completion.wallet)
      .single();

  await supabase
    .from("users")
    .update({
      points:
        (user?.points || 0) +
        (task?.reward || 0),
    })
    .eq(
      "wallet",
      completion.wallet
    );

  await supabase
    .from("tasks")
    .update({
      completions:
        (task?.completions || 0) + 1,

      spent:
        (task?.spent || 0) +
        (task?.reward || 0),
    })
    .eq("id", task.id);

  await supabase
    .from("task_completions")
    .update({
      status: "approved",
    })
    .eq("id", completion.id);

  loadData();
}
async function markPaid(
  id: number
) {
  await supabase
    .from("tasks")
    .update({
      payment_status: "paid",
    })
    .eq("id", id);

  loadData();
}
  async function activateTask(
    id: number
  ) {
    await supabase
      .from("tasks")
      .update({
        status: "active",
      })
      .eq("id", id);

    loadData();
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-5xl font-bold text-red-500">
            Access Denied
          </h1>

          <p className="text-zinc-500 mt-4">
            Admin Only
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-center mb-10">
        🛠 FREECOIN Admin
      </h1>

      <div className="grid md:grid-cols-5 gap-4 mb-10">

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
          <p>Users</p>
          <p className="text-4xl font-bold text-green-400">
            {users.length}
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
          <p>Tasks</p>
          <p className="text-4xl font-bold text-blue-400">
            {tasks.length}
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
          <p>Completions</p>
          <p className="text-4xl font-bold text-yellow-400">
            {completions.length}
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
          <p>Referrals</p>
          <p className="text-4xl font-bold text-pink-400">
            {referrals.length}
          </p>
        </div>
<h2 className="text-3xl font-bold mt-12 mb-6">
  Pending Completions
</h2>

<div className="space-y-4">

  {completions
    .filter(
      (c) =>
        c.status === "pending"
    )
    .map((completion) => (

      <div
        key={completion.id}
        className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
      >

        <p>
          Wallet:
          {" "}
          {completion.wallet}
        </p>

        <p>
          Task ID:
          {" "}
          {completion.task_id}
        </p>

        <div className="flex gap-2 mt-4">

          <button
            onClick={() =>
              approveCompletion(
                completion
              )
            }
            className="bg-green-600 px-4 py-2 rounded-xl"
          >
            Approve
          </button>

          <button
            onClick={() =>
              rejectCompletion(
                completion.id
              )
            }
            className="bg-red-600 px-4 py-2 rounded-xl"
          >
            Reject
          </button>

        </div>

      </div>

  ))}

</div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
          <p>FREE Paid</p>
          <p className="text-4xl font-bold text-purple-400">
            {tasks.reduce(
              (sum, task) =>
                sum +
                (task.spent || 0),
              0
            )}
          </p>
        </div>

      </div>

      <h2 className="text-3xl font-bold mb-6">
        Tasks
      </h2>

      <div className="space-y-4 mb-12">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5"
          >
            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-xl font-bold">
                  {task.title}
                </h3>

                <p>
                  Reward:
                  {" "}
                  {task.reward}
                </p>

                <p>
                  Budget:
                  {" "}
                  {task.budget}
                </p>

                <p>
                  Spent:
                  {" "}
                  {task.spent || 0}
                </p>

                <p>
                  Status:
                  {" "}
                  {task.status}
                </p>

              </div>
<p className="text-zinc-500 break-all">
  Advertiser:
  {" "}
  {task.advertiser_wallet}
</p>

<p className="text-zinc-500">
  Payment:
  {" "}
  {task.payment_status || "unpaid"}
</p>
              <div className="flex gap-2">

                <button
                  onClick={() =>
                    activateTask(
                      task.id
                    )
                  }
                  className="bg-green-600 px-4 py-2 rounded-xl"
                >
                  Activate
                </button>

                <button
                  onClick={() =>
                    pauseTask(
                      task.id
                    )
                  }
                  className="bg-yellow-600 px-4 py-2 rounded-xl"
                >
                  Pause
                </button>
<button
  onClick={() =>
    markPaid(
      task.id
    )
  }
  className="bg-purple-600 px-4 py-2 rounded-xl"
>
  Paid
</button>
                <button
                  onClick={() =>
                    deleteTask(
                      task.id
                    )
                  }
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      <h2 className="text-3xl font-bold mb-6">
        Users
      </h2>

      <div className="space-y-3 mb-12">

        {users.map((user) => (
          <div
            key={user.wallet}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          >
            <p className="text-green-400 break-all">
              {user.wallet}
            </p>

            <p>
              Points:
              {" "}
              {user.points || 0}
            </p>
          </div>
        ))}

      </div>

      <h2 className="text-3xl font-bold mb-6">
        Referrals
      </h2>

      <div className="space-y-3">

        {referrals.map((ref) => (
          <div
            key={ref.id}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"
          >
            <p>
              Referrer:
              {" "}
              {ref.referrer_wallet}
            </p>

            <p>
              User:
              {" "}
              {ref.referred_wallet}
            </p>
          </div>
        ))}

      </div>

    </main>
  );
}