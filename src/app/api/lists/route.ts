"use server";

import { axiosServerInstance } from "@/axios";
import { List } from "@/types";
import { MAX_LIST_NAME_LENGTH, sanitize } from "@/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import validator from "validator";

let mockLists: List[] = [
  {
    listId: "1",
    listName: "Action Favorites",
    movies: [],
    createdAt: new Date("2024-01-10").toISOString(),
    updatedAt: new Date("2024-01-10").toISOString(),
  },
  {
    listId: "2",
    listName: "Comedy Nights",
    movies: [],
    createdAt: new Date("2024-02-15").toISOString(),
    updatedAt: new Date("2024-02-15").toISOString(),
  },
  {
    listId: "3",
    listName: "Drama Picks",
    movies: [],
    createdAt: new Date("2024-03-20").toISOString(),
    updatedAt: new Date("2024-03-20").toISOString(),
  },
  {
    listId: "4",
    listName: "Sci-Fi Classics",
    movies: [],
    createdAt: new Date("2024-04-25").toISOString(),
    updatedAt: new Date("2024-04-25").toISOString(),
  },
];

export async function GET(request: NextRequest) {
  // Get token
  const { getToken } = await auth();
  const token = await getToken();

  // Get user's list
  const { data } = await axiosServerInstance({
    method: "get",
    url: process.env.AWS_API_GATEWAY_URL,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function POST(request: NextRequest) {
  // List name
  let { listName } = await request.json();
  
  // Sanitize
  try {
    if (!listName)
      throw new Error("Missing name field");

    listName = listName.trim();
    
    // Constrain type
    if (typeof listName !== "string")
      throw new Error("Invalid type");

    // Constrain length
    if (!validator.isLength(listName, { min: 1, max: MAX_LIST_NAME_LENGTH }))
      throw new Error("Invalid name length");
    
    listName = sanitize(listName);

  } catch(err: any) {
    return NextResponse.json({ message: err.message }, {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }
  
  // Add new list to DB
  const { getToken } = await auth();
  const token = await getToken();

  const { data } = await axiosServerInstance({
    method: "post",
    url: process.env.AWS_API_GATEWAY_URL,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    data: { listId: uuidv4(), listName }
  });

  return NextResponse.json(data, {
    status: data.statusCode,
    headers: {
      "Content-Type": "application/json"
    },
  });
}