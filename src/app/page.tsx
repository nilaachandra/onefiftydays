"use client";
import PublishedJournal from "@/components/PublishedJournal";
import { useJournals } from "./useJournals";
import { useEffect } from "react";

export default function Home() {
  const { refetch, isFetchedAfterMount } = useJournals();

  useEffect(() => {
    isFetchedAfterMount ? null : refetch();
  }, [isFetchedAfterMount]);

  return (
    <main className="w-full min-h-screen">
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
