import { errorWrapper } from "@/utils/api-wrapper";
import AppError from "@/utils/AppError";
import { fetchMoviesByCategory } from "@/utils/common-server-actions";
import { NextRequest, NextResponse } from "next/server";

async function handleGET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = 1; // Should be coming from the slug, but lock it at 1 for now

  // Validate category
  if (!slug || slug.length === 0)
    throw new AppError("Missing category", 400);
  
  const category = slug[0];
  const data = await fetchMoviesByCategory({ category, page });

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export const GET = errorWrapper(handleGET);