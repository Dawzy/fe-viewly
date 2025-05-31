export type Movie = {
  id: string;
  name: string;
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

export type MovieInfoDialogProps = {}

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

export interface IMovieActionPayload {
  listId: List["listId"];
  movies: Movie[];
};