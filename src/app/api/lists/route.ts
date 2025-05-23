"use server";

import { axiosServerInstance } from "@/axios";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const LISTS_URL = "/lists";

export async function GET(request: NextRequest) {
  // Get user id
  const { getToken } = await auth();
  const token = await getToken();

  ////////////// TO DO
  // Get user's list
  // const res = await axiosServerInstance({
  //   method: "get",
  //   url: LISTS_URL,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  // console.log(res, res.data);

  return NextResponse.json({ message: "TEST" }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function POST(request: NextRequest) {

  return NextResponse.json( { message: "POST lists/" }, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}