import Days from "@/components/Days";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <section className="hero flex justify-center my-8">
        <h1 className="lg:w-1/2 w-full text-center text-2xl font-bold">
          Unfolding the Path to Self in One Hundred and Fifty Days
        </h1>
      </section>
      <h1 className="text-xl">Here are the days ...</h1>
      <section className="">
        <Days
          day={1}
          title="The quick brown ox jumps over the lazy dog"
          createdAt="20-08-2024"
          views={27}
          slug="hahaha"
        />
        <Days
          day={2}
          title="The quick brown ox jumps over the lazy dog"
          createdAt="20-08-2024"
          views={23}
          slug="hahaha"
        />
        <Days
          day={3}
          title="The quick brown ox jumps over the lazy dog"
          createdAt="20-08-2024"
          views={22}
          slug="hahaha"
        />
      </section>
    </main>
  );
}
