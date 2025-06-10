import { queryOptions } from "@tanstack/react-query";
import {
  IMoviesPayload,
} from "@/types";
import {
  getLists,
  getList,
  getMovies,
} from "./actions";
import { BROWSE_QUERY_KEY, LISTS_QUERY_KEY } from "@/constants";

export const listsQueryOptions = () => {
  return queryOptions({
    queryKey: [LISTS_QUERY_KEY],
    queryFn: () => getLists(),
    retryDelay: failureCount => failureCount * 1000,
    staleTime: Infinity,
  });
}

export const listQueryOptions = ( listId: string ) => {
  return queryOptions({
    queryKey: [LISTS_QUERY_KEY, { listId }],
    queryFn: () => getList({ listId }),
    retryDelay: failureCount => failureCount * 1000,
    staleTime: Infinity,
  });
}

export const browseQueryOptions = (payload: IMoviesPayload) => {
  return queryOptions({
    queryKey: [BROWSE_QUERY_KEY, payload],
    queryFn: () => getMovies(payload),
    retryDelay: failureCount => failureCount * 1000,
    staleTime: Infinity,
  });
}