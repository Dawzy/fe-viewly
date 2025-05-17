type PageHeaderOption = {
  [key: string]: boolean; // True if is destructive (requires contrasted text like red)
};

export interface ListPageProps {
  params: Promise<{ id: string }>;
}

export interface PageHeaderProps {
  title: string;
  options?: PageHeaderOption;
  showAddButton?: boolean;
}