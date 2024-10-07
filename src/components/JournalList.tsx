"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import JournalCard from "./DashboardJournalCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Journal {
  id: number;
  title: string;
  content: string;
  status: "PUBLISHED" | "DRAFTING" | "ARCHIVED";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
}

const fetchJournals = async (): Promise<Journal[]> => {
  const response = await axios.get("/api/journal/all-journal");
  return response.data.journals;
};

const JournalList = () => {
  const {
    data: journals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["journals"],
    queryFn: fetchJournals,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full" />
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
          Failed to fetch journals. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {journals &&
        journals.map((journal) => (
          <div key={journal.id}>
            <JournalCard journal={journal} />
          </div>
        ))}
    </div>
  );
};

export default JournalList;
