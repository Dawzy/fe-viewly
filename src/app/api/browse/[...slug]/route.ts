import { errorWrapper } from "@/utils/api-wrapper";
import { fetchMoviesByCategory } from "@/utils/common-server-actions";
import { NextRequest, NextResponse } from "next/server";

async function handleGET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {

  const { slug } = await params;
  const data = await fetchMoviesByCategory({ category: "asd", page: 1 });

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export const GET = errorWrapper(handleGET);