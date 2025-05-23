import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("GET lists/[id]");
  return "TEST";
}

export async function POST(request: NextRequest) {
  console.log("POST lists/[id]");
  return "TEST";
}