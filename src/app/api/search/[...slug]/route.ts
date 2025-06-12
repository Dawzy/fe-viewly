import { axiosTMDBInstance } from "@/axios";
import { sanitizeString } from "@/utils";
import { errorWrapper } from "@/utils/api-wrapper";
import AppError from "@/utils/AppError";
import { NextRequest, NextResponse } from "next/server";

async function handleGET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = 1; // Should be coming from the slug, but lock it at 1 for now

  // Validate category
  if (!slug || sanitizeString(slug[0]).length === 0)
    throw new AppError("Missing search query", 400);
  const searchQuery = sanitizeString(slug[0]);

  // Consume API
  const { data } = await axiosTMDBInstance({
    method: "get",
    url: `/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`,
  });

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export const GET = errorWrapper(handleGET);