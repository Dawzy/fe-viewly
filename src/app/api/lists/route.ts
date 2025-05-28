"use server";

import { axiosServerInstance } from "@/axios";
import { List } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import validator from "validator";

let mockLists: List[] = [
  {
    id: "1",
    name: "Action Favorites",
    movies: [],
    createdAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: "2",
    name: "Comedy Nights",
    movies: [],
    createdAt: new Date("2024-02-15").toISOString(),
  },
  {
    id: "3",
    name: "Drama Picks",
    movies: [],
    createdAt: new Date("2024-03-20").toISOString(),
  },
  {
    id: "4",
    name: "Sci-Fi Classics",
    movies: [],
    createdAt: new Date("2024-04-25").toISOString(),
  },
];

export async function GET(request: NextRequest) {
  // TO DO: Get list of lists
    // Get user token
    // Consume AWS API
    // Delegate status to front end
      // Return lists

  // Get token
  const { getToken } = await auth();
  const token = await getToken();

  // Get user's list
  // const res = await axiosServerInstance({
  //   method: "get",
  //   url: process.env.AWS_API_GATEWAY_URL,
  //   headers: {
  //     Authorization: `Bearer ${to,ken}`
  //     "Content-Type": "application/json"
  //   }
  // });

  // console.log(res, res.data);

  return NextResponse.json(mockLists, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function POST(request: NextRequest) {
  // TO DO: Create new list
    // Get user token
    // Get list name
    // Create list object
    // Consume AWS API
    // Delegate status to front end
    // Return new list
  
  const { getToken } = await auth();
  const token = await getToken();
  const { name: listName } = await request.json();
  
  // TODO: SANITIZE
  if (validator.isEmpty(listName))
    return NextResponse.json({ message: "Name cannot be empty." }, {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });

  const newList: List = {
    id: uuidv4(),
    name: listName,
    movies: [],
    createdAt: new Date().toISOString()
  }

  mockLists.push(newList);

  // Add new empty list to DB
  // const res = await axiosServerInstance({
  //   method: "put",
  //   url: process.env.AWS_API_GATEWAY_URL,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json"
  //   }
  // });

  return NextResponse.json(newList, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}