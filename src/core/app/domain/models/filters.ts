export class Filters<T, S> {
  item?: T;
  page?: number;
  size?: number;
  orderBy?: S;

  constructor(filter: { item?: T; page?: number; size?: number; orderBy?: S }) {
    if (filter.item) {
      this.item = filter.item;
    }
    this.page = filter.page;
    this.size = filter.size;
    this.orderBy = filter.orderBy;
  }
}
