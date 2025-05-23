type PageHeaderOption = {
  [key: string]: boolean; // True if is destructive (requires contrasted text like red)
};

export type List = {
  id: string;
  movies: Movie[];
}

export type Movie = {
  id: string;
  name: string;
}

export interface PageHeaderProps {
  title: string;
  options?: PageHeaderOption;
  showAddButton?: boolean;
}

export interface IListsPayload {
  page?: number;
  perPage?: number;
}

export interface IListsResponse {
  data: List[];
}

export interface IListPayload {
  id: List["id"];
  page?: number;
  perPage?: number;
}

export interface IListResponse {
  data: Movie[];
}