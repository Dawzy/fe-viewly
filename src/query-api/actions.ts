"use client";

import { axiosClientInstance } from "@/axios";
import {
  IAddMovieActionPayload,
  IListDeletePayload,
  IListRenamePayload,
  IMoviesPayload,
  IMoviesResponse,
  IRemoveMovieActionPayload,
  List,
} from "@/types";

// URLS
const LISTS_URL = "/lists";
const BROWSE_URL = "/browse";

export const getMovies = async (
    payload: IMoviesPayload
): Promise<IMoviesResponse> => {
  const { data } = await axiosClientInstance({
    method: "get",
    url: `${BROWSE_URL}/${payload.category}/${payload.page}`
  });

  return data;
}

export const getLists = async (): Promise<List[]> => {
  const { data } = await axiosClientInstance({
    method: "get",
    url: LISTS_URL,
  });

  return data;
}

export const getList = async (
  payload: Pick<List, "listId">
): Promise<List> => {
  const { data } = await axiosClientInstance({
    method: "get",
    url: `${LISTS_URL}/${payload["listId"]}`,
  });

  return data;
}

export const newList = async (
  payload: Pick<List, "listName">
): Promise<List> => {
  const { data } = await axiosClientInstance({
    method: "post",
    url: LISTS_URL,
    data: payload
  });

  return data;
}

export const deleteList = async (
  payload: IListDeletePayload
): Promise<void> => {
  await axiosClientInstance({
    method: "delete",
    url:`${LISTS_URL}/${payload["listId"]}`,
  });
}

export const renameList = async (
  payload: IListRenamePayload
): Promise<List> => {
  const { data } = await axiosClientInstance({
    method: "patch",
    url:`${LISTS_URL}/${payload.listId}`,
    data: { listName: payload.listName }
  });

  return data;
}

export const addMovie = async (
  payload: IAddMovieActionPayload
): Promise<void> => {
  await axiosClientInstance({
    method: "post",
    url: `${LISTS_URL}/${payload.listId}/${payload.movieId}`,
  });
}

export const removeMovie = async (
  payload: IRemoveMovieActionPayload
): Promise<void> => {
  await axiosClientInstance({
    method: "delete",
    url: `${LISTS_URL}/${payload.listId}/${payload.movieId}`,
  });
}