interface PageDetails {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export class Page<T> {
  content: T[];
  page: PageDetails;

  constructor() {
    this.content = [] as T[];
    this.page = {
      size: 0,
      number: 0,
      totalElements: 0,
      totalPages: 0
    };
  }
}
