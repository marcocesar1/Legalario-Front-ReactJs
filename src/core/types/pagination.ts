export interface Pagination {
  current_page: number;
  per_page: number;
  from: number;
  to: number;
  path: string;
  first_page_url: string;
  next_page_url: string;
  prev_page_url: null;
  has_more_pages: boolean;
  last_page: number;
  total: number;
}
