import type { Id } from "@/src/common/utils/types";

export class PatchSupplyPointModel {
  id: Id;

  constructor(supplyPoint: { id: Id }) {
    this.id = supplyPoint.id;
  }
}
