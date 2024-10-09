"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Days from "./Days";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import HomepageSkeleton from "./HomepageSkeleton";

interface Journal {
  id: number;
  title: string;
  publishedAt: string;
  viewCount: number;
  slug: string;
}

const fetchPublishedJournals = async (): Promise<Journal[]> => {
  const response = await axios.get("/api/journal?status=PUBLISHED");
  return response.data.journals;
};

const PublishedJournal = () => {
  const {
    data: publishedJournals,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publishedJournals"],
    queryFn: fetchPublishedJournals,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index}><HomepageSkeleton /></div>
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
            )}
            views={journal.viewCount}
            slug={`/${journal.slug}`}
          />
        ))}
    </section>
  );
};

export default PublishedJournal;
