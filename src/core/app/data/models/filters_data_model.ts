/* eslint-disable @typescript-eslint/no-explicit-any */
import { toJson } from "@/src/common/utils/transformers";
import { Exclude, Expose, Type } from "class-transformer";
import type { Filters } from "@/src/core/app/domain/models/filters";
import { isEmptyValue } from "@/src/common/utils";

export class FiltersDataModel<T extends { fromDomain(input: any): void }, S extends { fromDomain(input: any): void; toString(): string }> {
  @Exclude()
  private type: new (...args: any[]) => any;

  @Expose()
  @Type((options) => {
    return (options?.newObject as FiltersDataModel<T, S>).type;
  })
  item: T;
  @Expose()
  page?: number;
  @Expose()
  size?: number;
  @Expose({ name: "order_by" })
  orderBy?: S;

  readonly queryParamsStart = "?";
  readonly queryParamsJoin = "&";
  readonly queryParamsArrayJoin = ",";

  constructor(type: new (...args: any[]) => any, sortType: new (...args: any[]) => any) {
    this.type = type;
    this.item = new type({});
    this.orderBy = new sortType();
  }

  toQueryParams() {
    const queryParams = [];

    const itemAsJson = toJson(this.item);
    for (const key in itemAsJson) {
      const value = itemAsJson[key];
      if (!isEmptyValue(value)) {
        const queryParam = `${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(value) ? value.join(this.queryParamsArrayJoin) : value)}`;
        queryParams.push(queryParam);
      }
    }

    if (this.page) {
      queryParams.push(`page=${this.page}`);
    }

    if (this.size) {
      queryParams.push(`size=${this.size}`);
    }

    const orderBy = this.orderBy && this.orderBy.toString();
    if (orderBy) {
      queryParams.push(orderBy);
    }

    return this.queryParamsStart + queryParams.join(this.queryParamsJoin);
  }

  fromDomain<D, S>({ item, page, size, orderBy }: Filters<D, S>) {
    this.item.fromDomain(item);
    this.size = size;
    this.page = page;
    this.orderBy?.fromDomain(orderBy);
  }
}
