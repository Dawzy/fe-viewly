"use client";

import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  deleteList,
  newList,
  renameList,
  addMovie,
  removeMovie
} from "./actions";
import toast from "react-hot-toast";
import { LISTS_QUERY_KEY } from "@/constants";

// Mutations
export const useNewListMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newList,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: () => toast.error("Failed to create new list")
  });
};

export const useDeleteListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: () => toast.error("Failed to delete list")
  });
};

export const useRenameListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameList,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: () => toast.error("Failed to rename list")
  });
};

export const useAddMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovie,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: () => toast.error("Failed to add movie")
  });
}

export const useRemoveMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeMovie,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: () => toast.error("Failed to remove movie")
  });
}