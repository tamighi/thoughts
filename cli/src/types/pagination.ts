export interface IPaginationQuery {
  page?: number;
  limit?: number;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginatedResult<T> {
  items: T[];
  meta: IPaginationMeta;
}
