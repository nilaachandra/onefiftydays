"use client";

import { Eye, Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { incrementLike, incrementView } from "@/app/journals/[slug]/actions";
import { useJournals } from "@/app/useJournals";

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
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [viewCount, setViewCount] = useState(initialViewCount);
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(false);
  const [browserId, setBrowserId] = useState<string | null>(null);
  const { refetch } = useJournals();

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
    incrementView(journalId).then((result) => {
      if (result.success) {
        setViewCount(result.viewCount as number);
      }
      refetch()
    });
  }, [journalId]);

  const handleLike = () => {
    if (!browserId) return;

    startTransition(async () => {
      const result = await incrementLike(journalId, browserId);
      if (result.success) {
        setLikeCount(result.likeCount as number);
        setIsLiked(result.isLiked as boolean);

        // Update local storage
        const likedJournals = JSON.parse(
          localStorage.getItem("likedJournals") || "{}"
        );
        if (result.isLiked) {
          likedJournals[journalId] = true;
        } else {
          delete likedJournals[journalId];
        }
        localStorage.setItem("likedJournals", JSON.stringify(likedJournals));
      } else {
        toast.error("Failed to update like. Please try again.");
      }
    });
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
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isPending || !browserId}
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
