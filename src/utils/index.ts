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

export const ratingToColor = (rating: number) => {
  rating = Math.max(0, Math.min(1, rating));
  
  let r, g;
  
  if (rating < 0.6) {
    // Red to yellow
    const t = rating / 0.6;
    r = 255;
    g = Math.round(255 * t);
  } else {
    // Yellow to green
    const t = (rating - 0.6) / 0.4;
    r = Math.round(255 * (1 - t));
    g = 255;
  }
  
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}00`;
}