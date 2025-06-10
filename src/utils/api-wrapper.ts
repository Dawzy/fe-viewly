import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import AppError from "@/utils/AppError";

type RouteHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

export function errorWrapper(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error: any) {
      let message = "An error occurred";
      let status = 500;

      if (axios.isAxiosError(error)) {
        const{ message: msg, status: statusCode } = error.response?.data;
        message = msg;
        status = statusCode ?? status;
      }

      if (error instanceof AppError) {
        message = error.message;
        status = error.statusCode;
      }

      console.error(message);
      return NextResponse.json(
        { message }, { status }
      );
    }
  };
}