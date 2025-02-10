import { Snippet, snippets } from "@/db/schema";
import { db } from "@/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const allSnippets = await db.select().from(snippets);
  return NextResponse.json(allSnippets);
}

export async function POST(req: Request, res: Response) {
  try {
    const { title, code, description, category }: Snippet = await req.json();
    const newSnippet = await db.insert(snippets).values({ title, code, description, category }).returning();
    return NextResponse.json(newSnippet);
  } catch (error) {
    return NextResponse.error()
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const { id } = await req.json();
    await db.delete(snippets).where(eq(snippets.id, id));
    return NextResponse.json({ message: "Snippet deleted successfully!" });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const { id, title, code, description, category }: Snippet = await req.json();
    await db.update(snippets).set({ title, code, description, category }).where(eq(snippets.id, id));
    return NextResponse.json({ message: "Snippet updated successfully!" });
  } catch (error) {
    return NextResponse.error();
  }
}