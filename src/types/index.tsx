import { UseQueryOptions } from "@tanstack/react-query";

export type TMDBGenre = {
  id: number;
  name: string;
}

type TMDBProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

type TMDBProductionCountry = {
  iso_3166_1: string;
  name: string;
}

type TMDBSpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type TMDBMovieDetailsMin = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type TMDBMovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object | null;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type Movie = {
  movieId: TMDBMovieDetailsMin["id"];
  title: string;
  vote_average: number;
  genres: number[];
  overview: string;
  poster_path: string;
  runtime: number;
}

export type List = {
  listId: string;
  listName: string;
  movies: Movie[];
  createdAt: string;
  updatedAt: string;
}

export type InputDialogProps = {
  onConfirm: (...args: any[]) => void;
  
  title: string;
  desc: string;

  label?: string;
  confirmButtonText?: string;
  maxInputLength?: number;

  isDestructive?: boolean;
  destructiveWord?: string;
}

export type ConfirmDialogProps = {
  onConfirm: (...args: any[]) => void;
  title: string;
  desc: string;
  confirmButtonText?: string;
  isDestructive?: boolean;
}

export type MovieInfoDialogProps = {
  overview: TMDBMovieDetails["overview"];
  poster_path: TMDBMovieDetails["poster_path"];
  title: TMDBMovieDetails["title"];
  runtime?: TMDBMovieDetails["runtime"];
  vote_average: TMDBMovieDetails["vote_average"];
  genres: TMDBMovieDetails["genres"];
  onConfirm: (...args: any[]) => void;
  isRemove?: boolean;
}

export type DisclaimerDialogProps = {
  onConfirm: (...args: any[]) => void;
}

export interface IPageHeaderOption {
  optionName: string;
  onClick: () => void;
  isDestructive: boolean;
}

export interface PageHeaderProps {
  title: string;
  options?: IPageHeaderOption[];
  onAdd?: () => void;
  pendingChange?: boolean;
}

export interface ListCardProps {
  list: List;
  onRename: (...args: any[]) => void;
  onDelete: (...args: any[]) => void;
}

export interface MoviesProps {
  listId: List["listId"];
}

export interface MovieCardProps {
  movie: Movie;
  onDelete: (...args: any[]) => void;
  showLoading?: boolean;
}

export interface MovieBannerProps {
  movie: TMDBMovieDetailsMin;
  isPriority: boolean;
}

export interface MovieBannerCarouselProps {
  title: string;
  queryOptions: Omit<UseQueryOptions<IMoviesResponse, Error, IMoviesResponse, any>, "queryFn">;
  carouselIndex: number;
}

export interface IListRenamePayload {
  listId: List["listId"];
  listName: string;
}

export interface IListDeletePayload {
  listId: List["listId"];
}

export interface IMovieActionPayload {
  listId: List["listId"];
  movies: Movie[];
};

export interface IMoviesPayload {
  category: string;
  page: number;
}

export interface ISearchMoviesPayload {
  query: string;
  page: number;
}

export interface IMoviesResponse {
  results: TMDBMovieDetailsMin[];
  page: number;
  total_pages: number;
}

export interface IMoviePayload {
  movieId: TMDBMovieDetailsMin["id"];
}

export interface IAddMovieActionPayload {
  listId: List["listId"];
  movieId: TMDBMovieDetailsMin["id"];
}

export interface IRemoveMovieActionPayload {
  listId: List["listId"];
  movieId: TMDBMovieDetailsMin["id"];
}