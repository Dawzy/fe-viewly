import { TMDBGenre } from "@/types";

export const MAX_LIST_NAME_LENGTH = 20;
export const MAX_LIST_COUNT = 10;
export const MAX_MOVIE_IN_LIST_COUNT = 20;
export const LISTS_QUERY_KEY = "lists";
export const BROWSE_QUERY_KEY = "browse";
export const GENRES: TMDBGenre[] = [
  { id: 28,     name: "Action" },
  { id: 12,     name: "Adventure" },
  { id: 16,     name: "Animation" },
  { id: 35,     name: "Comedy" },
  { id: 80,     name: "Crime" },
  { id: 99,     name: "Documentary" },
  { id: 18,     name: "Drama" },
  { id: 10751,  name: "Family" },
  { id: 14,     name: "Fantasy" },
  { id: 36,     name: "History" },
  { id: 27,     name: "Horror" },
  { id: 10402,  name: "Music" },
  { id: 9648,   name: "Mystery" },
  { id: 10749,  name: "Romance" },
  { id: 878,    name: "Science Fiction" },
  { id: 10770,  name: "TV Movie" },
  { id: 53,     name: "Thriller" },
  { id: 10752,  name: "War" },
  { id: 37,     name: "Western" }
]

// Exclude genres that wouldnt fit the target one
// Target's genre ID is the id
export const GENRE_EXCLUSIONS = [
  {
    id: 27,
    exclusions: [28, 35, 10749, 53]
  },
  {
    id: 28,
    exclusions: [35, 27, 10749, 53]
  },
  {
    id: 35,
    exclusions: [28, 27, 10749, 53]
  },
  {
    id: 53,
    exclusions: [27, 28, 35, 10749]
  }
];