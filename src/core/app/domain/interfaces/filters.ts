export class Filters<T> {
  item: Partial<T>;
  page: number;
  size: number;
  readonly queryParamsStart = "?";
  readonly queryParamsJoin = "&";

  constructor(filter: { item: Partial<T>; page: number; size: number }) {
    this.item = filter.item;
    this.page = filter.page;
    this.size = filter.size;
  }

  toQueryParams() {
    const queryParams = [];

    Object.keys(this.item).forEach((key) => {
      const value = String(this.item[key as keyof T]);
      if (value) {
        const queryParam = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        queryParams.push(queryParam);
      }
    });

    queryParams.push(`page=${this.page}`);
    queryParams.push(`size=${this.size}`);

    return this.queryParamsStart + queryParams.join(this.queryParamsJoin);
  }
}
