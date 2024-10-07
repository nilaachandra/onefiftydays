import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Fetch only the journal entries that are 'PUBLISHED'
    const publishedJournals = await db.journal.findMany({
      where: {
        status: 'PUBLISHED', // Filter to get only published journals
      },
      orderBy: {
        createdAt: 'desc', // Order by creation date
      },
      include: {
        views: {
          select: {
            id: true,
            createdAt: true,
          },
        },
        likes: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
    });

    // Calculate the view and like counts for each journal
    const journalsWithCounts = publishedJournals.map(({ views, likes, ...journal }) => ({
      ...journal,
      viewCount: views.length,
      likeCount: likes.length,
    }));

    // Return the published journals with view and like counts
    return NextResponse.json({ journals: journalsWithCounts });
  } catch (error) {
    console.error("Error fetching published journals:", error);
    return NextResponse.json(
      { error: "Failed to fetch published journals" },
      { status: 500 }
    );
  }
}
