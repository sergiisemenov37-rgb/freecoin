import WalletButton from "../components/WalletButton";
import TasksList from "../components/TasksList";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <nav className="flex justify-between items-center p-6 border-b border-zinc-800">

  <h1 className="text-3xl font-bold text-green-400">
    FREECOIN
  </h1>

  <div className="flex flex-wrap gap-4 text-sm md:text-base">

    <details className="relative">
      <summary className="cursor-pointer bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700">
        🎯 Earn
      </summary>

      <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3 z-50">

        <a href="/">
          🏠 Home
        </a>

        <a href="/leaderboard">
          🏆 Leaderboard
        </a>

        <a href="/referrals">
          👥 Referrals
        </a>

        <a href="/profile">
          👤 Profile
        </a>

      </div>
    </details>

    <details className="relative">
      <summary className="cursor-pointer bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700">
        📢 Advertiser
      </summary>

      <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3 z-50">

        <a href="/create-task">
          ➕ Create Campaign
        </a>
<a href="/advertise">
  🚀 Advertise
</a>
        <a href="/dashboard/advertiser">
          📊 My Campaigns
        </a>

        <a href="/buy">
          💳 Payments
        </a>

      </div>
    </details>

    <details className="relative">
      <summary className="cursor-pointer bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700">
        ❤️ Donate
      </summary>

      <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3 z-50">

        <a href="/fundraisers">
          ❤️ Fundraisers
        </a>

        <a href="/create-fundraiser">
          ➕ Create Fundraiser
        </a>

      </div>
    </details>

    <a
      href="/whitepaper"
      className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700"
    >
      📄 Whitepaper
    </a>
<a href="/roadmap">
  🗺 Roadmap
</a>
    <a
      href="/admin"
      className="bg-red-900 px-4 py-2 rounded-xl border border-red-700"
    >
      🛠 Admin
    </a>
<a
  href="/tokenomics"
  className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700"
>
  🪙 Tokenomics
</a>

<a
  href="/grants"
  className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700"
>
  🚀 Grants
</a>
<a
  href="/investors"
  className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700"
>
  🚀 Investors
</a>
  </div>


        </nav>

      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Earn • Donate • Freelance
        </h2>

        <p className="text-zinc-400 text-xl max-w-2xl mb-10">
          A Web3 platform on Solana where users earn rewards,
          support causes and complete freelance tasks.
        </p>

        <WalletButton />
        <Stats />

      

        <div className="mt-10 w-full max-w-4xl">
  <details className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4">

    <summary className="cursor-pointer text-2xl font-bold text-green-400">
      🎯 Tasks Marketplace
    </summary>

    <div className="mt-6">
      <TasksList />
    </div>

  </details>
</div>

      </section>

      <section
        id="earn"
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6"
      >

        <div className="border border-zinc-800 rounded-2xl p-8 bg-zinc-950 hover:border-green-500 transition">

          <h3 className="text-2xl font-bold mb-3">
            💰 Earn
          </h3>

          <p>
            Complete tasks and earn FREE points.
          </p>

        </div>

        <div className="border border-zinc-800 rounded-2xl p-8 bg-zinc-950 hover:border-pink-500 transition">

          <h3 className="text-2xl font-bold mb-3">
            ❤️ Donate
          </h3>

          <p>
            Support people and charity projects.
          </p>

        </div>

        <div className="border border-zinc-800 rounded-2xl p-8 bg-zinc-950 hover:border-blue-500 transition">

          <h3 className="text-2xl font-bold mb-3">
            💼 Freelance
          </h3>

          <p>
            Find jobs and get paid in crypto.
          </p>

        </div>

      </section>

    </main>
  );
}