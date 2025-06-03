import { queryOptions } from "@tanstack/react-query";
import {
  IMoviesPayload,
  List
} from "@/types";
import {
  getLists,
  getList,
  getMovies
} from "./actions";
import { BROWSE_QUERY_KEY, LISTS_QUERY_KEY } from "@/constants";

export const listsQueryOptions = () => {
  return queryOptions({
    queryKey: [LISTS_QUERY_KEY],
    queryFn: () => getLists()
  });
}

export const listQueryOptions = ( listId: List["listId"] ) => {
  return queryOptions({
    queryKey: [LISTS_QUERY_KEY, { listId }],
    queryFn: () => getList({ listId })
  });
}

export const browseQueryOptions = (payload: IMoviesPayload) => {
  return queryOptions({
    queryKey: [BROWSE_QUERY_KEY, payload],
    queryFn: () => getMovies(payload)
  });
}