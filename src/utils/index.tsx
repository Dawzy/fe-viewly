import img1 from "/public/image 1.png"
import img2 from "/public/image 2.png"
import img3 from "/public/image 3.png"
import img4 from "/public/image 4.png"
import { InputDialogProps, List } from "@/types";

export const MAX_LIST_NAME_LENGTH = 20;

export const getMockData = () => [img1, img2, img3, img4];

export const sanitize = (str: string) => str.replace(/[<>\"'&]/g, "").replace(/\s+/g, " ");

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