export default function GrantsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        FREECOIN Grant Application
      </h1>

      <div className="max-w-5xl space-y-8">

        <div>
          <h2 className="text-3xl font-bold text-green-400">
            Problem
          </h2>

          <p className="text-zinc-300">
            Millions of users lack access to transparent
            earning opportunities, global freelance work,
            and decentralized fundraising.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            Solution
          </h2>

          <p className="text-zinc-300">
            FREECOIN combines task rewards,
            freelance jobs, referrals and fundraising
            into one Solana-powered ecosystem.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            Current Progress
          </h2>

          <ul className="list-disc pl-6 text-zinc-300">
            <li>Website launched</li>
            <li>Wallet integration</li>
            <li>Task marketplace</li>
            <li>Referral system</li>
            <li>Fundraising platform</li>
            <li>Admin dashboard</li>
            <li>SOL payments</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-400">
            Grant Usage
          </h2>

          <ul className="list-disc pl-6 text-zinc-300">
            <li>Smart contract development</li>
            <li>Token launch</li>
            <li>Mobile application</li>
            <li>Security audits</li>
            <li>Marketing and growth</li>
          </ul>
        </div>

      </div>

    </main>
  );
}