import { supabase } from "../../lib/supabase";

export default async function Fundraisers() {
  const { data: fundraisers } = await supabase
    .from("fundraisers")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">
          Fundraisers
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {fundraisers?.map((item) => {
            const percent =
              item.goal > 0
                ? Math.min(
                    Math.round((item.raised / item.goal) * 100),
                    100
                  )
                : 0;

            return (
              <div
                key={item.id}
                className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950"
              >
                <h2 className="text-2xl font-bold mb-3">
                  {item.title}
                </h2>

                <p className="text-zinc-400 mb-6">
                  {item.description}
                </p>

                <div className="mb-3">
                  Raised: {item.raised} / {item.goal}
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-4 mb-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center">

                  <span className="text-green-400">
                    {percent}% funded
                  </span>

                  <a
                    href={`/fundraisers/${item.id}`}
                    className="bg-green-600 px-4 py-2 rounded-xl"
                  >
                    Donate
                  </a>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </main>
  );
}