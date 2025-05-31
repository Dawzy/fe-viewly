"use server";

import { axiosServerInstance } from "@/axios";
import { MAX_LIST_NAME_LENGTH, sanitize } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;

  // Make sure list ID is a valid uuid v4
  if (!listId || !validator.isUUID(listId, 4))
    return NextResponse.json({ message: "Invalid id" }, {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      },
    });

  // Get list data from DB
  const { getToken } = await auth();
  const token = await getToken();
  const { data: list } = await axiosServerInstance({
    method: "get",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // TO DO: GET ALL MOVIES DATA FROM TMDB
  const mockList = {
    listId: "4",
    listName: "Sci-Fi Classics",
    movies: [
      { id: "1", name: "Inception" },
      { id: "2", name: "The Matrix" },
      { id: "3", name: "Interstellar" },
      { id: "4", name: "Blade Runner" },
      { id: "5", name: "The Prestige" }
    ],
    createdAt: new Date("2024-04-25").toISOString(),
    updatedAt: new Date("2024-04-25").toISOString()
  }

  return NextResponse.json(mockList, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;
  let { listName, movies } = await request.json();
  const payload: any = {};
  
  // Sanitize name
  if (listName) {
    try {
      if (!listName)
        throw new Error("Missing fields field");
  
      listName = listName.trim();
      
      // Constrain type
      if (typeof listName !== "string")
        throw new Error("Invalid type");
  
      // Constrain length
      if (!validator.isLength(listName, { min: 1, max: MAX_LIST_NAME_LENGTH }))
        throw new Error("Invalid name length");
      
      listName = sanitize(listName);

      if (listName !== "")
        payload.listName = listName;
  
    } catch(err: any) {
      return NextResponse.json({ message: err.message }, {
        status: 400,
        headers: {"Content-Type": "application/json"},
      });
    }
  }

  if (movies && !Array.isArray(movies)) {
    return NextResponse.json({ message: "Invalid movies field" }, {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  if (movies) payload.movies = movies;

  // Make sure list ID is a valid uuid v4
  if (!listId || !validator.isUUID(listId, 4))
    return NextResponse.json({ message: "Invalid id" }, {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      },
    });

  // Patch list in DB
  const { getToken } = await auth();
  const token = await getToken();
  const res = await axiosServerInstance({
    method: "patch",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
    headers: {
      "Content-Type": "applcation/json",
      "Authorization": `Bearer ${token}`
    },
    data: payload
  });

  return NextResponse.json({ message: "Success" }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { getToken } = await auth();
  const token = await getToken();
  const { listId } = await params;

  // Make sure list ID is a valid uuid v4
  if (!listId || !validator.isUUID(listId, 4))
    return NextResponse.json({ message: "Invalid id" }, {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      },
    });

  // Delete list from DB
  const res = await axiosServerInstance({
    method: "delete",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return NextResponse.json({ message: "Success" }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}