export default function Tokenomics() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        FREECOIN Tokenomics
      </h1>

      <div className="max-w-4xl space-y-6">

        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
          <h2 className="text-2xl font-bold text-green-400">
            Community Rewards — 40%
          </h2>
          <p>
            Rewards for users completing tasks and participating.
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
          <h2 className="text-2xl font-bold text-blue-400">
            Ecosystem Growth — 20%
          </h2>
          <p>
            Marketing, growth campaigns and partnerships.
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
          <h2 className="text-2xl font-bold text-yellow-400">
            Treasury — 15%
          </h2>
          <p>
            Long-term platform sustainability.
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
          <h2 className="text-2xl font-bold text-pink-400">
            Team — 15%
          </h2>
          <p>
            Core development and operations.
          </p>
        </div>

        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
          <h2 className="text-2xl font-bold text-purple-400">
            Partnerships — 10%
          </h2>
          <p>
            Strategic collaborations and integrations.
          </p>
        </div>

      </div>

    </main>
  );
}