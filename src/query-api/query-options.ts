import { queryOptions } from "@tanstack/react-query";
import {
  IMoviesPayload,
  ISearchMoviesPayload,
} from "@/types";
import {
  getLists,
  getList,
  getMovies,
  searchMovies,
} from "./actions";
import { BROWSE_QUERY_KEY, LISTS_QUERY_KEY, SEARCH_QUERY_KEY } from "@/constants";

export const listsQueryOptions = (enabled=true) => {
  return queryOptions({
    queryKey: [LISTS_QUERY_KEY],
    queryFn: () => getLists(),
    retryDelay: failureCount => failureCount * 1000,
    staleTime: Infinity,
    enabled,
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

export const searchQueryOptions = (payload: ISearchMoviesPayload, enabled: boolean) => {
  return queryOptions({
    queryKey: [SEARCH_QUERY_KEY, payload],
    queryFn: () => searchMovies(payload),
    retryDelay: failureCount => failureCount * 1000,
    staleTime: Infinity,
    enabled
  });
}