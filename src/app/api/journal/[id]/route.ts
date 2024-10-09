import { NextResponse } from 'next/server'
import { db } from "@/lib/db"
import { auth } from "@/app/lib/auth"
import { z } from "zod"

const JournalSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  status: z.enum(["PUBLISHED", "DRAFTING", "ARCHIVED"]),
  slug: z.string().min(1),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid journal ID' }, { status: 400 })
    }

    const journal = await db.journal.findUnique({
      where: { id },
      include: {
        views: true,
        likes: true,
      },
    })

    if (!journal) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 })
    }

    return NextResponse.json(journal)
  } catch (error) {
    console.error('Error fetching journal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journal' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid journal ID' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = JournalSchema.parse(body)

    const updatedJournal = await db.journal.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json(updatedJournal)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating journal:', error)
    return NextResponse.json(
      { error: 'Failed to update journal' },
      { status: 500 }
    )
  }
}