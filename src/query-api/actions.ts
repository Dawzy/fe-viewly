import { axiosClientInstance } from "@/axios";
import { IMovieActionPayload, List } from "@/types";

// URLS
const LISTS_URL = "/lists";
const BROWSE_URL = "/browse";

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
  payload: Pick<List, "listId">
): Promise<void> => {
  await axiosClientInstance({
    method: "delete",
    url:`${LISTS_URL}/${payload["listId"]}`,
  });
}

export const renameList = async (
  payload: Pick<List, "listId" | "listName">
): Promise<List> => {
  const { data } = await axiosClientInstance({
    method: "patch",
    url:`${LISTS_URL}/${payload["listId"]}`,
    data: payload
  });

  return data;
}

export const putMovie = async (
  payload: IMovieActionPayload
): Promise<void> => {
  await axiosClientInstance({
    method: "put",
    url: `${LISTS_URL}/${payload["listId"]}/${payload["movieId"]}`,
  });
}

export const deleteMovie = async (
  payload: IMovieActionPayload
): Promise<void> => {
  await axiosClientInstance({
    method: "delete",
    url:`${LISTS_URL}/${payload["listId"]}/${payload["movieId"]}`,
  });
}