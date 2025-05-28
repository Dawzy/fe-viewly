"use client";

import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  deleteList,
  deleteMovie,
  newList,
  putMovie,
  renameList
} from "./actions";
import toast from "react-hot-toast";

// Mutations
export const useNewListMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: newList,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    onError: () => toast.error("Failed to create new list.")
  });
};

export const useDeleteListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteList,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    onError: () => toast.error("Failed to delete list.")
  });
};

export const useRenameListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameList,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    onError: () => toast.error("Failed to rename list.")
  });
};

export const usePutMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putMovie,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    onError: () => toast.error("Failed to add movie.")
  });
};

export const useDeleteMovieMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    onError: () => toast.error("Failed to remove movie.")
  });
};