// app/journal/[slug]/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { DateTimeComponent } from "@/components/DateTimeComponent";
import ViewsAndLikes from "@/components/ViewsAndLikes";

// Define a type-safe interface for Journal
interface Journal {
  id: number;
  title: string;
  content: string;
  slug: string;
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
  // Fetch the journal entry along with views and likes count
  const journalData = await db.journal.findFirst({
    where: { slug: params.slug },
    select: {
      id: true,
      title: true,
      content: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
      createdAt: true,
      _count: {
        select: {
          views: true,
          likes: true,
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
    slug: params.slug,
    status: journalData.status,
    publishedAt: journalData.publishedAt.toISOString(),
    createdAt: journalData.createdAt.toISOString(),
    updatedAt: journalData.updatedAt.toISOString(),
    viewCount: journalData._count.views,
    likeCount: journalData._count.likes,
  };

  return (
    <div className="container mx-auto">
      {/* Journal Title */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold leading-none mb-1">
          {journal?.title}
        </h1>
        <DateTimeComponent dateTimeString={journal?.createdAt} />
      </div>

      {/* Journal Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: journal?.content }}
      />

      {/* Likes and Views Section */}
      <ViewsAndLikes
        journalId={journal?.id}
        likeCount={journal?.likeCount}
        viewCount={journal?.viewCount}
      />
    </div>
  );
}
