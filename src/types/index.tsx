export type Movie = {
  id: string;
  name: string;
}

export type List = {
  id: string;
  name: string;
  movies: Movie[];
  createdAt: string;
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
  listId: List["id"];
}

export interface MovieCardProps {
  movie: Movie;
}

export interface IMovieActionPayload {
  listId: List["id"];
  movieId: Movie["id"];
};