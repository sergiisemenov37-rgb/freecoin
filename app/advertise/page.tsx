export default function AdvertisePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Advertise on FREECOIN
        </h1>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto mb-12">
          Reach Web3 users, crypto enthusiasts and
          Solana community members through tasks,
          campaigns and engagement rewards.
        </p>

        <a
          href="/create-task"
          className="inline-block bg-green-600 hover:bg-green-500 px-8 py-4 rounded-2xl text-xl font-bold"
        >
          🚀 Start Campaign
        </a>

      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-20">

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Real Engagement
          </h2>

          <p className="text-zinc-400">
            Users complete tasks and interact with
            your project directly.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            ⚡ Solana Powered
          </h2>

          <p className="text-zinc-400">
            Built on Solana ecosystem with future
            support for token rewards and payments.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            📈 Grow Faster
          </h2>

          <p className="text-zinc-400">
            Launch campaigns and attract users
            through gamified rewards.
          </p>
        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-8 text-center">
            Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Starter
              </h3>

              <p className="mt-4 text-4xl font-bold">
                0.1 SOL
              </p>

              <p className="mt-4 text-zinc-400">
                1000 FREE Budget
              </p>
            </div>

            <div className="border border-green-500 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Growth
              </h3>

              <p className="mt-4 text-4xl font-bold">
                0.5 SOL
              </p>

              <p className="mt-4 text-zinc-400">
                5000 FREE Budget
              </p>
            </div>

            <div className="border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Pro
              </h3>

              <p className="mt-4 text-4xl font-bold">
                1 SOL
              </p>

              <p className="mt-4 text-zinc-400">
                10000 FREE Budget
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}