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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: (error) => toast.error((error as any).response?.data?.message ?? "Failed to create new list")
  });
};

export const useDeleteListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: (error) => toast.error((error as any).response?.data?.message ?? "Failed to delete list")
  });
};

export const useRenameListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameList,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: (error) => toast.error((error as any).response?.data?.message ?? "Failed to rename list")
  });
};

export const useAddMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: (error) => toast.error((error as any).response?.data?.message ?? "Failed to add movie")
  });
}

export const useRemoveMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeMovie,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [LISTS_QUERY_KEY] }),
    onError: (error) => toast.error((error as any).response?.data?.message ?? "Failed to remove movie")
  });
}