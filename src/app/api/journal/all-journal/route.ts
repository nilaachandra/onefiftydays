import { auth } from "@/app/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all journal entries with their views and likes
    const journals = await db.journal.findMany({
      orderBy: {
        createdAt: 'desc',
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
    })

    // Calculate the view and like counts for each journal
    const journalsWithCounts = journals.map(journal => ({
      ...journal,
      viewCount: journal.views.length,
      likeCount: journal.likes.length,
    }))

    return NextResponse.json({ journals: journalsWithCounts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}