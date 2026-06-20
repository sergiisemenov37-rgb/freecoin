"use client";

export default function Tasks() {
  return (
    <div className="mt-10 border border-zinc-800 rounded-2xl p-6 w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        FREE Tasks
      </h2>

      <div className="flex flex-col gap-4">

        <a
          href="https://t.me/freecoin"
          target="_blank"
          className="bg-blue-500 px-4 py-3 rounded-xl"
        >
          Join Telegram (+10)
        </a>

        <a
          href="https://x.com/freecoin"
          target="_blank"
          className="bg-zinc-700 px-4 py-3 rounded-xl"
        >
          Follow X (+10)
        </a>

        <a
          href="https://discord.gg/freecoin"
          target="_blank"
          className="bg-indigo-600 px-4 py-3 rounded-xl"
        >
          Join Discord (+10)
        </a>

        <a
          href="https://youtube.com/@freecoin"
          target="_blank"
          className="bg-red-600 px-4 py-3 rounded-xl"
        >
          Subscribe YouTube (+15)
        </a>

        <a
          href="https://instagram.com/freecoin"
          target="_blank"
          className="bg-pink-600 px-4 py-3 rounded-xl"
        >
          Follow Instagram (+10)
        </a>

        <a
          href="https://tiktok.com/@freecoin"
          target="_blank"
          className="bg-black border border-white px-4 py-3 rounded-xl"
        >
          Follow TikTok (+15)
        </a>

        <a
          href="https://github.com/freecoin"
          target="_blank"
          className="bg-gray-700 px-4 py-3 rounded-xl"
        >
          GitHub (+10)
        </a>

        <a
          href="https://freecoin.com"
          target="_blank"
          className="bg-green-600 px-4 py-3 rounded-xl"
        >
          Visit Website (+5)
        </a>

      </div>

      <div className="mt-6 text-yellow-400 font-bold">
        Complete tasks and earn FREE Points
      </div>
    </div>
  );
}