import { supabase } from "../../lib/supabase";

export default async function Leaderboard() {
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .order("points", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-10 text-center">
          FREECOIN Leaderboard
        </h1>

        <div className="flex flex-col gap-4">

          {users?.map((user, index) => (
            <div
              key={user.id}
              className="border border-zinc-800 rounded-2xl p-5 bg-zinc-950"
            >
              <div className="flex justify-between items-center">

                <div>
                  <div className="text-2xl font-bold">
                    #{index + 1}
                  </div>

                  <div className="text-zinc-400 break-all">
                    {user.wallet}
                  </div>
                </div>

                <div className="text-yellow-400 text-2xl font-bold">
                  {user.points || 0}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}