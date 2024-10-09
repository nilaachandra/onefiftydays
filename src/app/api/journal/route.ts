import { NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { Status } from '@prisma/client'

export async function GET(request: Request) {
  try {
    // Get the status from the query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as Status | null

    // Fetch journals based on the status
    const journals = await db.journal.findMany({
      where: status ? { status } : {},
      orderBy: {
        publishedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        publishedAt: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            views: true,
            likes: true,
          },
        },
      },
    })

    // Transform the data to include view and like counts
    const transformedJournals = journals.map(journal => ({
      ...journal,
      viewCount: journal._count.views,
      likeCount: journal._count.likes,
      _count: undefined,
    }))

    return NextResponse.json({ journals: transformedJournals })
  } catch (error) {
    console.error('Error fetching journals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journals' },
      { status: 500 }
    )
  }
}