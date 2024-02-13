import type { Id } from "@/src/common/utils/types";

export class BasicMarketerModel {
  id: Id;
  name: string;

  constructor(rate: { id: Id; name: string }) {
    this.id = rate.id;
    this.name = rate.name;
  }
}
