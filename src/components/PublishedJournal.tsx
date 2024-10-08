"use client";

import React from "react";
import Days from "./Days";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useJournals } from "@/app/useJournals";

const PublishedJournal = () => {
  const { publishedJournals, error, isLoading } = useJournals();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[100px] w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to fetch published journals. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="space-y-4">
      {publishedJournals &&
        publishedJournals.map((journal, index) => (
          <Days
            key={journal.id}
            day={publishedJournals.length - index}
            title={journal.title}
            createdAt={new Date(journal.publishedAt).toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )} // Formatting the date
            views={journal.viewCount}
            slug={`/${journal.slug}`} // Assuming the slug is used for navigation
          />
        ))}
    </section>
  );
};

export default PublishedJournal;
