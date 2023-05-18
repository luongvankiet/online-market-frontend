export interface IResource<T> {
  data: T,
}

export interface IPagingLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface IPagingMetas {
  current_page: number,
  from: number,
  last_page: number,
  path: string | null,
  per_page: number,
  to: number,
  total: number
}

export interface ICollection<T> {
  data: T[];
  links: IPagingLinks;
  meta: IPagingMetas;
}
