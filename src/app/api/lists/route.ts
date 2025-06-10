"use server";

import { axiosAWSInstance } from "@/axios";
import { sanitizeString, validateListName } from "@/utils";
import { fetchLists } from "@/utils/common-server-actions";
import { errorWrapper } from "@/utils/api-wrapper";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

async function handleGET(_request: NextRequest) {
  const lists = await fetchLists();

  return NextResponse.json(lists, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

async function handlePOST(request: NextRequest) {
  // List name
  let { listName } = await request.json();
  
  // Sanitize list name
  listName = listName.trim();
  listName = sanitizeString(listName);
  validateListName(listName);
  
  // Add new list to DB
  const { getToken } = await auth();
  const token = await getToken();

  const { data } = await axiosAWSInstance({
    method: "post",
    url: process.env.AWS_API_GATEWAY_URL,
    headers: {
      "Authorization": `Bearer ${token}`,
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

export const GET = errorWrapper(handleGET);
export const POST = errorWrapper(handlePOST);