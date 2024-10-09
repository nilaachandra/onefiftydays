import PublishedJournal from "@/components/PublishedJournal";

export default function Home() {
  return (
    <main className="w-full min-h-[60vh]">
      <section className="hero flex justify-center my-8">
        <h1 className="lg:w-1/2 w-full text-center text-2xl font-bold">
          Unfolding the Path to Self in One Hundred and Fifty Days
        </h1>
      </section>
      <h1 className="text-xl">Here are the days ...</h1>
      <PublishedJournal />
    </main>
  );
}
