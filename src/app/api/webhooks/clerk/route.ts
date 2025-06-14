import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { errorWrapper } from "@/utils/api-wrapper";
import { axiosAWSInstance } from "@/axios";
import AppError from "@/utils/AppError";

async function handlePOST(request: NextRequest) {
  // Get webhook headers & body
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");
  const body = await request.text();

  if (!svixId || !svixTimestamp || !svixSignature || !body)
    throw new AppError("Missing required webhook headers and/or body", 400);

  // Verify the webhook
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  let event;

  event = wh.verify(body, {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  }) as any;

  // Handle user deletion
  if (event.type !== "user.deleted")
    throw new AppError("Event not supported.", 400);

  const userId = event.data.id;
  const { data } = await axiosAWSInstance({
    method: "delete",
    url: `${process.env.AWS_API_GATEWAY_WEBHOOKS_URL}/${userId}`,
  });

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export const POST = errorWrapper(handlePOST);