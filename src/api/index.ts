import baseInstance from "@/axiosInstances";
import {
  IListsPayload,
  IListsResponse,
  IListPayload,
  IListResponse,
} from "@/types";

// URLS
const LISTS = "/lists";

export const getLists = async (
  payload: IListsPayload
): Promise<IListsResponse> => {
  const { data } = await baseInstance({
    method: "get",
    url: LISTS,
    data: payload
  });

  return data;
}

export const getList = async (
  payload: IListPayload
): Promise<IListResponse> => {
  const { data } = await baseInstance({
    method: "get",
    url: `${LISTS}/${payload["id"]}`,
    data: payload
  });

  return data;
}
