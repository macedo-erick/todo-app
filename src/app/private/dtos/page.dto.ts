export class Page<T> {
  content: T[] = new Array<T>();
  page = {
    size: 0,
    number: 0,
    totalElements: 0,
    totalPages: 0
  };
}
