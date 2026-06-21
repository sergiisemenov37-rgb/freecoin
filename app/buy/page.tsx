"use client";

import {
Connection,
PublicKey,
SystemProgram,
Transaction,
LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const RECEIVER =
"HhZz13BAsk4peMTL1mwqu7yF2eCZJbS8NfJY5SfoApZ2";

export default function BuyPage() {
async function pay(amount: number) {
try {
const provider =
(window as any).phantom?.solana;

  if (!provider) {
    alert("Install Phantom Wallet");
    return;
  }

  await provider.connect();

  const connection = new Connection(
    "https://api.mainnet-beta.solana.com"
  );

  const fromPubkey =
    provider.publicKey;

  const transaction =
    new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey: new PublicKey(
          RECEIVER
        ),
        lamports:
          amount *
          LAMPORTS_PER_SOL,
      })
    );

  transaction.feePayer =
    fromPubkey;

  const { blockhash } =
    await connection.getLatestBlockhash();

  transaction.recentBlockhash =
    blockhash;

  const signedTransaction =
    await provider.signTransaction(
      transaction
    );

  const signature =
    await connection.sendRawTransaction(
      signedTransaction.serialize()
    );

  await connection.confirmTransaction(
    signature,
    "confirmed"
  );

  alert(
    "Payment successful!\n\nTX:\n" +
      signature
  );

} catch (error) {
  console.error(error);
  alert("Payment failed");
}

}

return (
<main className="min-h-screen bg-black text-white p-10">
<h1 className="text-5xl font-bold mb-10">
  💳 FREECOIN Payments
</h1>

<p className="text-zinc-400 mb-10">
  Buy advertising budget with SOL
</p>

  <div className="grid md:grid-cols-3 gap-6">

    <button
      onClick={() => pay(0.1)}
      className="bg-green-600 hover:bg-green-500 p-8 rounded-3xl text-3xl font-bold"
    >
      Pay 0.1 SOL
    </button>

    <button
      onClick={() => pay(0.5)}
      className="bg-blue-600 hover:bg-blue-500 p-8 rounded-3xl text-3xl font-bold"
    >
      Pay 0.5 SOL
    </button>

    <button
      onClick={() => pay(1)}
      className="bg-purple-600 hover:bg-purple-500 p-8 rounded-3xl text-3xl font-bold"
    >
      Pay 1 SOL
    </button>

  </div>

  <div className="mt-10 border border-zinc-800 rounded-2xl p-6 bg-zinc-950">

    <h2 className="text-2xl font-bold mb-4">
      Advertising Rates
    </h2>

    <p>0.1 SOL = 1,000 FREE Budget</p>
    <p>0.5 SOL = 5,000 FREE Budget</p>
    <p>1 SOL = 10,000 FREE Budget</p>

  </div>

</main>

);
}