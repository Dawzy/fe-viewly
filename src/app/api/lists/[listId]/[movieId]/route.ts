"use server";

import { axiosAWSInstance, axiosTMDBInstance } from "@/axios";
import { errorWrapper } from "@/utils/api-wrapper";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import AppError from "@/utils/AppError";
import { validateListId } from "@/utils";
import { TMDBGenre } from "@/types";

async function handlePOST(
  _request: NextRequest,
  { params }: { params: Promise<{ listId: string, movieId: string }> }
) {
  const { listId, movieId } = await params;

  validateListId(listId);

  // Validate TMDB movie ID
  if (!validator.isNumeric(movieId))
    throw new AppError("Invalid movie id", 400);

  // Get movie details from TMDB
  const { data: movieDetails } = await axiosTMDBInstance({
    method: "get",
    url: `/movie/${movieId}`
  });

  const {
    title,
    release_date,
    runtime,
    vote_average,
    genres,
    poster_path,
    overview
  } = movieDetails;

  const payload = {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    runtime,
    genres: genres.map( (genre: TMDBGenre) => genre.id)
  }

  // Adding move to list in DB
  const { getToken } = await auth();
  const token = await getToken();
  const { data } = await axiosAWSInstance({
    method: "put",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}/${movieId}`,
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
  { params }: { params: Promise<{ listId: string, movieId: string }> }
) {
  const { listId, movieId } = await params;

  // Validate TMDB movie ID
  if (!validator.isNumeric(movieId))
    throw new AppError("Invalid movie id", 400);
  
  validateListId(listId);

  // Delete movie from list in DB
  const { getToken } = await auth();
  const token = await getToken();
  const { data } = await axiosAWSInstance({
    method: "delete",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}/${movieId}`,
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

export const POST = errorWrapper(handlePOST);
export const DELETE = errorWrapper(handleDELETE);