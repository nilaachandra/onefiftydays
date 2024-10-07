import { auth } from "@/app/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
const blogPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
    content: z.string().min(1, 'Content is required'),
    status: z.enum(['PUBLISHED', 'DRAFTING', 'ARCHIVED']).default('DRAFTING'),
})

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized User' }, { status: 401 })
        }
        const body = await req.json()
        const validatedData = blogPostSchema.parse(body);

        //write new journa
        const newJournal = await db.journal.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                status: validatedData.status
            }
        })
        return NextResponse.json({ message: "Journal Created Succesfully", post: newJournal }, { status: 201 })
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            )
        }

        // Handle Prisma errors
        if (error instanceof Error) {
            console.error('Error creating blog post:', error)
            return NextResponse.json(
                { error: 'Failed to create blog post' },
                { status: 500 }
            )
        }

        // Handle other errors
        console.error('Unexpected error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}