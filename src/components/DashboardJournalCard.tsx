"use client";

import React from "react";
import { Edit, Archive, Eye, Trash2, ThumbsUp, Send, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DateTimeComponent } from "./DateTimeComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { archiveJournal, deleteJournal, publishJournal } from "@/app/cms/cms-actions/actions";
import { ConfirmDelete } from "./ConfirmDelete";

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

interface JournalCardProps {
  journal: Journal;
  onEdit?: (id: number) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({
  journal,
  onEdit,
}) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      toast.success("Journal deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete journal");
    },
  });

  const archiveMutation = useMutation({
    mutationFn: archiveJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      toast.success("Journal archived successfully");
    },
    onError: () => {
      toast.error("Failed to archive journal");
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      toast.success("Journal published successfully");
    },
    onError: () => {
      toast.error("Failed to publish journal");
    },
  });

  const getStatusInfo = (
    status: Journal["status"]
  ): { color: string; name: string } => {
    switch (status) {
      case "PUBLISHED":
        return { color: "bg-green-500", name: "Published" };
      case "ARCHIVED":
        return { color: "bg-yellow-500", name: "Archived" };
      case "DRAFTING":
        return { color: "bg-gray-500", name: "Drafting" };
      default:
        return { color: "bg-blue-500", name: "Unknown" };
    }
  };

  const statusInfo = getStatusInfo(journal.status);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      deleteMutation.mutate(journal.id);
    }
  };

  const handleArchive = () => {
    archiveMutation.mutate(journal.id);
  };

  const handlePublish = () => {
    publishMutation.mutate(journal.id);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{journal.title}</CardTitle>
        <CardDescription className="">
          <DateTimeComponent dateTimeString={journal.createdAt} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Badge className={`${statusInfo.color} text-white`}>
            {statusInfo.name}
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              <ThumbsUp className="mr-1 h-4 w-4" />
              {journal.likeCount}
            </span>
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {journal.viewCount}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button variant="default" size="sm" onClick={() => onEdit?.(journal.id)}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        {(journal.status === "DRAFTING" || journal.status === "ARCHIVED") && (
          <Button
            variant="default"
            size="sm"
            onClick={handlePublish}
            disabled={publishMutation.isPending}
          >
            {publishMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {publishMutation.isPending ? "Publishing..." : "Publish"}
          </Button>
        )}
        {journal.status === "PUBLISHED" && (
          <Button
            variant="default"
            size="sm"
            onClick={handleArchive}
            disabled={archiveMutation.isPending}
          >
            {archiveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Archive className="mr-2 h-4 w-4" />
            )}
            {archiveMutation.isPending ? "Archiving..." : "Archive"}
          </Button>
        )}
        <ConfirmDelete journalId={journal.id}/>
      </CardFooter>
    </Card>
  );
};

export default JournalCard;