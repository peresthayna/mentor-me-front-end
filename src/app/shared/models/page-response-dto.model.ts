export class PageResponseDTO<T> {
  items: T[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}
