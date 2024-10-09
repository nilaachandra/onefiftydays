"use client";

import { Eye, Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementLike, incrementView } from "@/app/actions/actions";

interface ViewsAndLikesProps {
  journalId: number;
  viewCount: number;
  likeCount: number;
}

const ViewsAndLikes = ({
  journalId,
  viewCount: initialViewCount,
  likeCount: initialLikeCount,
}: ViewsAndLikesProps) => {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [browserId, setBrowserId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    let storedBrowserId = localStorage.getItem("browserId");
    if (!storedBrowserId) {
      storedBrowserId = uuidv4();
      localStorage.setItem("browserId", storedBrowserId);
    }
    setBrowserId(storedBrowserId);

    // Check if this journal is liked by this browser
    const likedJournals = JSON.parse(
      localStorage.getItem("likedJournals") || "{}"
    );
    setIsLiked(!!likedJournals[journalId]);

    // Increment view count
    incrementViewMutation.mutate(journalId);
  }, [journalId]);

  const incrementViewMutation = useMutation({
    mutationFn: incrementView,
    onSuccess: (data) => {
      if (data.success) {
        setViewCount(data.viewCount as number);
        queryClient.invalidateQueries({ queryKey: ["journals"] });
        queryClient.invalidateQueries({ queryKey: ["publishedJournals"] });
      } else {
        toast.error(data.error || "Failed to increment view count");
      }
    },
    onError: () => {
      toast.error("Failed to increment view count");
    },
  });

  const incrementLikeMutation = useMutation({
    mutationFn: ({
      journalId,
      browserId,
    }: {
      journalId: number;
      browserId: string;
    }) => incrementLike(journalId, browserId),
    onMutate: async ({ journalId }) => {
      await queryClient.cancelQueries({ queryKey: ["journals", journalId] });
      await queryClient.cancelQueries({ queryKey: ["publishedJournals"] });

      const previousJournal = queryClient.getQueryData<ViewsAndLikesProps>([
        "journals",
        journalId,
      ]);

      queryClient.setQueryData<ViewsAndLikesProps>(
        ["journals", journalId],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            likeCount: isLiked ? old.likeCount - 1 : old.likeCount + 1,
          };
        }
      );

      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      return { previousJournal };
    },
    onError: (err, { journalId }, context) => {
      queryClient.setQueryData(
        ["journals", journalId],
        context?.previousJournal
      );
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      toast.error("Failed to update like. Please try again.");
    },
    onSuccess: (data) => {
      if (data.success) {
        setLikeCount(data.likeCount as number);
        setIsLiked(data.isLiked as boolean);
      } else {
        toast.error(data.error || "Failed to update like");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["publishedJournals"] });
    },
  });

  const handleLike = () => {
    if (!browserId) return;
    incrementLikeMutation.mutate({ journalId, browserId });

    // Update local storage
    const likedJournals = JSON.parse(
      localStorage.getItem("likedJournals") || "{}"
    );
    if (!isLiked) {
      likedJournals[journalId] = true;
    } else {
      delete likedJournals[journalId];
    }
    localStorage.setItem("likedJournals", JSON.stringify(likedJournals));
  };

  return (
    <div className="mt-8 flex items-center space-x-4">
      {/* Views */}
      <div className="flex items-center space-x-1 text-gray-500">
        <Eye className="w-5 h-5" />
        <span>{viewCount || 0} views</span>
      </div>

      {/* Likes */}
      <div className="flex items-center space-x-1">
        <Button
         variant="link"
          size="sm"
          onClick={handleLike}
          disabled={incrementLikeMutation.isPending || !browserId}
          className={cn(
            "p-0 transition-colors duration-200",
            isLiked
              ? "text-red-500 hover:text-red-600"
              : "text-gray-500 hover:text-blue-500"
          )}
        >
          <Heart
            className={cn(
              "w-5 h-5 mr-1",
              isLiked ? "fill-current" : "fill-none"
            )}
          />
        </Button>
        <span
          className={cn(
            "transition-colors duration-200",
            isLiked ? "text-red-500" : "text-gray-500"
          )}
        >
          {likeCount || 0} hearts
        </span>
      </div>
    </div>
  );
};

export default ViewsAndLikes;
