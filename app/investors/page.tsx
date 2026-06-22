export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="py-24 px-6 text-center">

        <h1 className="text-6xl font-bold mb-6">
          FREECOIN
        </h1>

        <p className="text-2xl text-zinc-400 max-w-3xl mx-auto">
          Web3 earning, fundraising and freelance ecosystem
          built on Solana.
        </p>

      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 p-6">

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-green-400 text-4xl font-bold">
            MVP
          </h2>
          <p className="mt-2">
            Live Product
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-blue-400 text-4xl font-bold">
            Solana
          </h2>
          <p className="mt-2">
            Blockchain Infrastructure
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-yellow-400 text-4xl font-bold">
            Earn
          </h2>
          <p className="mt-2">
            Task Marketplace
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-pink-400 text-4xl font-bold">
            Donate
          </h2>
          <p className="mt-2">
            Fundraising Platform
          </p>
        </div>

      </section>

      <section className="max-w-5xl mx-auto p-6 mt-16">

        <h2 className="text-4xl font-bold mb-8">
          What We Built
        </h2>

        <div className="space-y-4 text-zinc-300">

          <p>✅ Solana Wallet Integration</p>

          <p>✅ Task Marketplace</p>

          <p>✅ Referral System</p>

          <p>✅ Fundraising Platform</p>

          <p>✅ Advertiser Dashboard</p>

          <p>✅ Admin Moderation System</p>

          <p>✅ SOL Payment Gateway</p>

          <p>✅ Whitepaper</p>

          <p>✅ Roadmap</p>

          <p>✅ Tokenomics</p>

        </div>

      </section>

      <section className="max-w-5xl mx-auto p-6 mt-20">

        <h2 className="text-4xl font-bold mb-8">
          Vision
        </h2>

        <p className="text-zinc-300 text-xl leading-relaxed">
          FREECOIN aims to become a global decentralized
          platform where users can earn, work, donate and
          participate in the Web3 economy without borders.
        </p>

      </section>

      <section className="max-w-5xl mx-auto p-6 mt-20">

        <h2 className="text-4xl font-bold mb-8">
          Funding Goals
        </h2>

        <div className="space-y-4 text-zinc-300">

          <p>• Smart Contracts Development</p>

          <p>• FREE Token Launch</p>

          <p>• Mobile Applications</p>

          <p>• Security Audits</p>

          <p>• Marketing & Growth</p>

          <p>• Ecosystem Expansion</p>

        </div>

      </section>

      <section className="text-center py-24">

        <a
          href="/whitepaper"
          className="bg-green-600 px-10 py-5 rounded-2xl text-xl font-bold"
        >
          Read Whitepaper
        </a>

      </section>

    </main>
  );
}