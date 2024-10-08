// app/journal/[slug]/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Eye, ThumbsUp } from "lucide-react";
import { DateTimeComponent } from "@/components/DateTimeComponent";

// Define a type-safe interface for Journal
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

export default async function JournalPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch the journal entry along with the count of views and likes
  const journalData = await db.journal.findFirst({
    where: { slug: params.slug },
    select: {
      id: true,
      title: true,
      content: true,
      status: true,
      publishedAt: true,
      createdAt: true,
      _count: {
        select: {
          views: true, // Count number of views
          likes: true, // Count number of likes
        },
      },
    },
  });

  // Handle case where journal is not found
  if (!journalData) {
    notFound(); // Triggers a 404 page
  }

  // Map the response to the type-safe Journal structure
  const journal: Journal = {
    id: journalData.id,
    title: journalData.title,
    content: journalData.content,
    status: journalData.status,
    publishedAt: journalData.publishedAt.toISOString(), // Convert to string
    createdAt: journalData.createdAt.toISOString(), // Convert to string
    updatedAt: new Date().toISOString(), // If needed, replace with updatedAt from Prisma
    viewCount: journalData._count.views,
    likeCount: journalData._count.likes,
  };

  return (
    <div className="">
      <div className="mb-4">
      <h1 className="text-3xl font-bold leading-none mb-1">{journal?.title}</h1>
      <DateTimeComponent dateTimeString={journal?.createdAt} />
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: journal?.content }}
      />

      {/* Likes and Views Section */}
      <div className="mt-8 flex items-center space-x-4">
        {/* Views */}
        <div className="flex items-center space-x-1 text-gray-500">
          <Eye className="w-5 h-5" />
          <span>{journal.viewCount || 0} views</span>
        </div>

        {/* Likes */}
        <div className="flex items-center space-x-1 text-gray-500">
          <ThumbsUp className="w-5 h-5" />
          <span>{journal.likeCount || 0} likes</span>
        </div>
      </div>
    </div>
  );
}
