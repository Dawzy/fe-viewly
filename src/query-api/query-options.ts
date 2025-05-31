import { List } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { getLists, getList } from "./actions";

export const listsQueryOptions = () => {
  return queryOptions({
    queryKey: ["lists"],
    queryFn: () => getLists()
  });
}

export const listQueryOptions = ( listId: List["listId"] ) => {
  return queryOptions({
    queryKey: ["list", { listId }],
    queryFn: () => getList({ listId })
  });
}
