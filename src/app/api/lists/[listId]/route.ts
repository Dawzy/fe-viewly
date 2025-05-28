"use server";

import { axiosServerInstance } from "@/axios";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  // TO DO: Get list and movies data
    // Get user token
    // Get list id
    // Consume AWS API
      // Delegate status to front end
    // Consume TMDB API
      // Delegate status to front end
    // Return list w/ movie data

  const { getToken } = await auth();
  const token = await getToken();
  const { listId } = await params;

  // Get list data from DB
  // const res = await axiosServerInstance({
  //   method: "get",
  //   url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  // TO DO: GET ALL MOVIES DATA FROM TMDB
  const list = {
    id: "4",
    name: "Sci-Fi Classics",
    movies: [
      { id: "1", name: "Inception" },
      { id: "2", name: "The Matrix" },
      { id: "3", name: "Interstellar" },
      { id: "4", name: "Blade Runner" },
      { id: "5", name: "The Prestige" }
    ],
    createdAt: new Date("2024-04-25").toISOString(),
  }

  return NextResponse.json(list, {
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
  // TO DO: Rename list
    // Get user token
    // Get list id
    // Get list new name
    // Consume AWS API
      // Delegate status to front end
  
  const { getToken } = await auth();
  const token = await getToken();
  const { listId } = await params;
  const { newName } = await request.json();

  // // Get list data from DB
  // const res = await axiosServerInstance({
  //   method: "get",
  //   url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  // const res = await axiosServerInstance({
  //   method: "put",
  //   url: process.env.AWS_API_GATEWAY_URL,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json"
  //   }
  // });

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
  // TO DO: Delete list
    // Get user token
    // Get list id
    // Get movie id
    // Consume AWS API
      // Delegate status to front end
    
  const { getToken } = await auth();
  const token = await getToken();
  const { listId } = await params;

  // Get list data from DB
  // const res = await axiosServerInstance({
  //   method: "delete",
  //   url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  return NextResponse.json({ message: "Success" }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}