/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exclude, Expose, Type } from "class-transformer";
import { Page } from "@/src/core/app/domain/models/page";
import type { DataModel } from "@/src/common/interfaces/data_model";

export class PageableDataModel<ItemDataType extends DataModel<ItemDomainType>, ItemDomainType> {
  @Exclude()
  private type: new (...args: any[]) => any;

  @Expose()
  @Type((options) => {
    return (options?.newObject as PageableDataModel<ItemDataType, ItemDomainType>).type;
  })
  items: Array<ItemDataType> = [];
  @Expose()
  total?: number;
  @Expose()
  page?: number;
  @Expose()
  size?: number;

  constructor(type: new (...args: any[]) => any) {
    this.type = type;
  }

  toDomain(): Page<ItemDomainType> {
    return new Page<ItemDomainType>({
      items: this.items.map((i) => i.toDomain()),
      total: this.total,
      page: this.page,
      size: this.size
    });
  }
}
