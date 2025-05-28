"use server";

import { axiosServerInstance } from "@/axios";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string, movieId: string }> }
) {
  // TO DO: Put movie in list
    // Get user token
    // Get list id
    // Get movie id
    // Consume AWS API
      // Delegate status to front end
  
  const { getToken } = await auth();
  const token = await getToken();
  const { listId, movieId } = await params;
  const { newName } = await request.json();

  // Get list data from DB
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
  { params }: { params: Promise<{ listId: string, movieId: string }> }
) {
  // TO DO: Delete movie from list
    // Get user token
    // Get list id
    // Get movie id
    // Consume AWS API
      // Delegate status to front end

  const { getToken } = await auth();
  const token = await getToken();
  const { listId, movieId } = await params;
  const { newName } = await request.json();

  // Get list data from DB
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