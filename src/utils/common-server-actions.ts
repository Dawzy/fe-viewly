"use server";

import { axiosAWSInstance, axiosTMDBInstance } from "@/axios";
import { IMoviesPayload, IMoviesResponse } from "@/types";
import { auth } from "@clerk/nextjs/server";
import AppError from "./AppError";
import { getGenreIdByName, validateListId } from "@/utils";
import { GENRE_EXCLUSIONS } from "@/constants";

export const fetchLists = async () => {
  // Get token
  const { getToken } = await auth();
  const token = await getToken();

  // Get user's list
  const { data: lists } = await axiosAWSInstance({
    method: "get",
    url: process.env.AWS_API_GATEWAY_URL,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  return lists;
}

export const fetchListById = async (listId: string) => {
  validateListId(listId);

  // Get list data from DB
  const { getToken } = await auth();
  const token = await getToken();
  const { data: list } = await axiosAWSInstance({
    method: "get",
    url: `${process.env.AWS_API_GATEWAY_URL}/${listId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return list;
}

export const fetchMoviesByCategory = async (
  {category, page}: IMoviesPayload
): Promise<IMoviesResponse> => {
  if (!["trending", "action", "comedy", "horror", "thriller"].includes( category ))
    throw new AppError("Invalid category", 400);
  
  // Construct API path
  let apiPath = "/trending/movie/week";
  if (category !== "trending") {
    const genreId = getGenreIdByName(category) ?? 0;
    const exclusions = GENRE_EXCLUSIONS.find(genre => genre.id === genreId)?.exclusions.join("%2C");
    apiPath = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}&without_genres=${exclusions}`
  }

  // Consume API
  const { data } = await axiosTMDBInstance({
    method: "get",
    url: apiPath,
  });

  return data;
}