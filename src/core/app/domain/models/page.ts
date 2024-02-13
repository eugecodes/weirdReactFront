export class Page<T> {
  items: Array<T> = [];
  page?: number;
  size?: number;
  total?: number;

  constructor(params: { items: Array<T>; size?: number; page?: number; total?: number }) {
    this.items = params.items;
    this.size = params.size;
    this.page = params.page;
    this.total = params.total;
  }
}
