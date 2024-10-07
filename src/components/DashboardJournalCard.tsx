"use client";
import React from "react";
import { Edit, Archive, Eye, Trash2, ThumbsUp, Send } from "lucide-react";
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
  onArchive?: (id: number) => void;
  onPublish?: (id: number) => void;
  onChangeStatus?: (id: number, newStatus: Journal["status"]) => void;
  onDelete?: (id: number) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({
  journal,
  onEdit,
  onArchive,
  onPublish,
  onChangeStatus,
  onDelete,
}) => {
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
        {/* <Button variant="default" size="sm" onClick={() => onEdit(journal.id)}> */}
        <Button variant="default" size="sm">
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        {journal.status === "DRAFTING" && (
          // <Button
          //   variant="default"
          //   size="sm"
          //   onClick={() => onPublish(journal.id)}
          // >
          <Button variant="default" size="sm">
            <Send className="mr-2 h-4 w-4" /> Publish
          </Button>
        )}
        {journal.status === "PUBLISHED" && (
          // <Button
          //   variant="default"
          //   size="sm"
          //   onClick={() => onArchive(journal.id)}
          // >
          <Button
            variant="default"
            size="sm"
            // onClick={() => onArchive(journal.id)}
          >
            <Archive className="mr-2 h-4 w-4" /> Archive
          </Button>
        )}
        {journal.status === "ARCHIVED" && (
          // <Button
          //   variant="default"
          //   size="sm"
          //   onClick={() => onChangeStatus(journal.id, "PUBLISHED")}
          // >
          <Button variant="default" size="sm">
            <Send className="mr-2 h-4 w-4" /> Republish
          </Button>
        )}
        {/* <Button
          variant="default"
          size="sm"
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(journal.id)}
        > */}
        <Button
          variant="default"
          size="sm"
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalCard;
