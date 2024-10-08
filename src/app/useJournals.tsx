import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
  slug: string; // Assuming slug is also part of the journal object
}
const fetchPublishedJournals = async (): Promise<Journal[]> => {
  const response = await axios.get("/api/journal/published");
  return response.data.journals;
};

export const useJournals = () => {
  const {
    data: publishedJournals,
    isLoading,
    error,
    refetch,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: ["publishedJournals"],
    queryFn: fetchPublishedJournals,
  });
  return { publishedJournals, isLoading, error, refetch, isFetchedAfterMount };
};
