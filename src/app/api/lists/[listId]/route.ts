"use server";

import { axiosServerInstance } from "@/axios";
import { sanitizeString, verifyListName } from "@/utils";
import { errorWrapper } from "@/utils/api-wrapper";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

async function handleGET(
  _request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;

  // Make sure list ID is a valid uuid v4
  if (!listId || !validator.isUUID(listId, 4))
    throw new AppError("Invalid list id", 400);

  // Get list data from DB
  // const { getToken } = await auth();
  // const token = await getToken();
  // const { data: list } = await axiosServerInstance({
  //   method: "get",
  //   url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

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

async function handlePATCH(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;
  let body = await request.json();
  const payload: any = {}; // Payload to be sent to cloud

  let bodyHasListNameField = false;
  let bodyHasMoviesField = false;
  
  // Validate name before adding to payload
  if (body.hasOwnProperty("listName")) {
    let listName = body.listName;

    listName = listName.trim();
    listName = sanitizeString(listName);
    verifyListName(listName);

    payload.listName = listName;
    bodyHasListNameField = true;
  }

  // Validate movies array before adding to payload
  if (body.hasOwnProperty("movies")) {
    if (!Array.isArray(body.movies))
      throw new AppError("Movies is not an array", 400);

    payload.movies = body.movies;
    bodyHasMoviesField = true;
  }

  if (!bodyHasListNameField && !bodyHasMoviesField)
    throw new AppError("Invalid body", 400);
  
  // Validate list ID
  if (!listId || !validator.isUUID(listId, 4))
    throw new AppError("Invalid list id", 400);

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

async function handleDELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { getToken } = await auth();
  const token = await getToken();
  const { listId } = await params;

  // Make sure list ID is a valid uuid v4
  if (!listId || !validator.isUUID(listId, 4))
    throw new AppError("Invalid list id", 400);

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

export const GET = errorWrapper(handleGET);
export const PATCH = errorWrapper(handlePATCH);
export const DELETE = errorWrapper(handleDELETE);