import { InputDialogProps, List } from "@/types"
import { MAX_LIST_NAME_LENGTH } from "@/constants";

export const getNewListDialogTemplate = (
  onConfirm: InputDialogProps["onConfirm"]
) => {
  return {
    onConfirm,
    title: "Create New List",
    desc: "Enter the name of the new movie list.",
  
    label: "Name",
    isDestructive: false,
    confirmButtonText: "Create",
    maxInputLength: MAX_LIST_NAME_LENGTH
  }
}

export const getRenameDialogTemplate = (
  onConfirm: InputDialogProps["onConfirm"],
  name: List["listName"]
) => {
  return {
    onConfirm,

    title: `Rename ${name}`,
    desc: `Enter the new name of ${name}`,
  
    label: "Name",
    confirmButtonText: "Rename",
    maxInputLength: MAX_LIST_NAME_LENGTH,
  }
}

export const getDeleteDialogTemplate = (
  onConfirm: InputDialogProps["onConfirm"],
  name: List["listName"],
  length: number
) => {
  return {
    onConfirm,

    title: `Delete ${name}`,
    desc: `Are you sure want to delete ${name} with ${length} movies?`,
  
    isDestructive: true,
    destructiveWord: "DELETE",
    confirmButtonText: "Delete"
  }
}