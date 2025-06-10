import AppError from "@/utils/AppError";
import { GENRES, MAX_LIST_NAME_LENGTH } from "@/constants";
import validator from "validator";

export const sanitizeString = (str: string) => str.replace(/[<>\"'&]/g, "").replace(/\s+/g, " ");

export const validateListName = (name: string) => {
  if (!name)
    throw new AppError("Missing name field", 400);
  
  // Constrain type
  if (typeof name !== "string")
    throw new AppError("Invalid type", 400);

  // Constrain length
  if (!validator.isLength(name, { min: 1, max: MAX_LIST_NAME_LENGTH }))
    throw new AppError("Invalid name length", 400);
}

export const validateListId = (listId: string) => {
  if (!listId || !validator.isUUID(listId, 4))
    throw new AppError("Invalid list id", 400);
}

export const getGenreByID = (id: number) => GENRES.find(genre => genre.id === id);
export const getGenreIdByName = (name: string) => GENRES.find(genre => genre.name.toLowerCase() === name.toLowerCase())?.id;
export const getGenresFromIDs = (ids: number[]) => GENRES.filter(genre => ids.includes( genre.id ));
export const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}