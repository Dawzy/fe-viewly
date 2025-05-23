import { IListPayload, IListsPayload, List } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { getLists, getList } from ".";

export const listsOptions = ( page: IListsPayload["page"] ) => {
  const payload: IListsPayload = { page };
  return queryOptions({
    queryKey: ["lists", payload],
    queryFn: () => getLists(payload),
  });
}

export const listOptions = ( id: List["id"] ) => {
  const payload: IListPayload = { id };
  return queryOptions({
    queryKey: ["list", payload],
    queryFn: () => getList(payload),
  });
}