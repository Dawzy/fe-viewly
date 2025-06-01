import img1 from "/public/image 1.png"
import img2 from "/public/image 2.png"
import img3 from "/public/image 3.png"
import img4 from "/public/image 4.png"
import { MAX_LIST_NAME_LENGTH } from "@/constants";
import validator from "validator";

export const getMockData = () => [img1, img2, img3, img4];

export const sanitizeString = (str: string) => str.replace(/[<>\"'&]/g, "").replace(/\s+/g, " ");

export const verifyListName = (name: string) => {
  if (!name)
    throw new AppError("Missing name field", 400);
  
  // Constrain type
  if (typeof name !== "string")
    throw new AppError("Invalid type", 400);

  // Constrain length
  if (!validator.isLength(name, { min: 1, max: MAX_LIST_NAME_LENGTH }))
    throw new AppError("Invalid name length", 400);
}