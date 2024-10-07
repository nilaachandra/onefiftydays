import { auth } from "@/app/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Journal validation schema
const JournalSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be 100 characters or less"),
    content: z.string().min(1, "Content is required"),
    status: z.enum(["PUBLISHED", "DRAFTING", "ARCHIVED"]).default("DRAFTING"),
});

// Helper function to convert title to kebab-case for slug
const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Function to ensure slug uniqueness by appending a number if the slug already exists
const ensureUniqueSlug = async (slug: string) => {
    let uniqueSlug = slug;
    let count = 1;

    // Check if the slug already exists
    while (await db.journal.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
};

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = JournalSchema.parse(body);

        // Generate slug from the title
        let slug = generateSlug(validatedData.title);

        // Ensure the slug is unique
        slug = await ensureUniqueSlug(slug);

        // Write new journal entry
        const newJournal = await db.journal.create({
            data: {
                title: validatedData.title,
                slug: slug,
                content: validatedData.content,
                status: validatedData.status,
            },
        });

        return NextResponse.json(
            { message: "Journal Created Successfully", post: newJournal },
            { status: 201 }
        );
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.errors },
                { status: 400 }
            );
        }

        // Handle Prisma errors
        if (error instanceof Error) {
            console.error("Error creating blog post:", error);
            return NextResponse.json(
                { error: "Failed to create blog post" },
                { status: 500 }
            );
        }

        // Handle other errors
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
