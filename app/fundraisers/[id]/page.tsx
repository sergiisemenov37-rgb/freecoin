import { supabase } from "../../../lib/supabase";
import DonateBox from "../../../components/DonateBox";

export default async function FundraiserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: fundraiser } = await supabase
    .from("fundraisers")
    .select("*")
    .eq("id", id)
    .single();

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("fundraiser_id", id)
    .order("id", { ascending: false });

  if (!fundraiser) {
    return <div>Not Found</div>;
  }

  const percent =
    fundraiser.goal > 0
      ? Math.min(
          Math.round(
            (fundraiser.raised / fundraiser.goal) * 100
          ),
          100
        )
      : 0;

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-4xl mx-auto">

        <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">

          <h1 className="text-5xl font-bold mb-6">
            {fundraiser.title}
          </h1>

          <p className="text-zinc-400 mb-8">
            {fundraiser.description}
          </p>

          <div className="mb-3">
            Raised: {fundraiser.raised} / {fundraiser.goal}
          </div>

          <div className="w-full bg-zinc-800 rounded-full h-5 mb-8">
            <div
              className="bg-green-500 h-5 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>

          <DonateBox
            fundraiserId={fundraiser.id}
            currentRaised={fundraiser.raised}
          />

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Recent Donations
          </h2>

          <div className="flex flex-col gap-4">

            {donations?.map((donation) => (
              <div
                key={donation.id}
                className="border border-zinc-800 rounded-xl p-4"
              >
                <div className="text-zinc-400 break-all">
                  {donation.donor_wallet}
                </div>

                <div className="text-green-400 font-bold">
                  {donation.amount}
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}