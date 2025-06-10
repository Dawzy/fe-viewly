"use server";

import { axiosAWSInstance } from "@/axios";
import { sanitizeString, validateListName } from "@/utils";
import { fetchListById } from "@/utils/common-server-actions";
import { errorWrapper } from "@/utils/api-wrapper";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import AppError from "@/utils/AppError";

async function handleGET(
  _request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;
  const list = await fetchListById(listId);

  return NextResponse.json(list, {
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
  const body = await request.json();
  const payload: { listName?: string } = {}; // Payload to be sent to cloud

  // Validate list ID
  if (!listId || !validator.isUUID(listId, 4))
    throw new AppError("Invalid list id", 400);
  
  // Validate new list name
  if (!body.hasOwnProperty("listName"))
    throw new AppError("Invalid name field", 400);

  let listName = body.listName;
  listName = listName.trim();
  listName = sanitizeString(listName);
  validateListName(listName);
  payload.listName = listName;

  // Patch list in DB
  const { getToken } = await auth();
  const token = await getToken();
  const { data } = await axiosAWSInstance({
    method: "patch",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: payload
  });

  return NextResponse.json({ message: data.message }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

async function handleDELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { getToken } = await auth();
  const token = await getToken();
  const { listId } = await params;

  // Make sure list ID is a valid uuid v4
  if (!listId || !validator.isUUID(listId, 4))
    throw new AppError("Invalid list id", 400);

  // Delete list from DB
  const { data } = await axiosAWSInstance({
    method: "delete",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return NextResponse.json({ message: data.message }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export const GET = errorWrapper(handleGET);
export const PATCH = errorWrapper(handlePATCH);
export const DELETE = errorWrapper(handleDELETE);