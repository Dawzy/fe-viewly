import { axiosClientInstance } from "@/axios";
import {
  IListsResponse,
  IListPayload,
  IListResponse,
} from "@/types";

// URLS
const LISTS_URL = "/lists";

export const getLists = async (): Promise<IListsResponse> => {
  const { data } = await axiosClientInstance({
    method: "get",
    url: LISTS_URL,
  });

  return data;
}

// TO DO
  // ADD PUT LIST
  // ADD DELETE LIST W/ ID

export const getList = async (
  payload: IListPayload
): Promise<IListResponse> => {
  const { data } = await axiosClientInstance({
    method: "get",
    url: `${LISTS_URL}/${payload["id"]}`,
  });

  return data;
}
