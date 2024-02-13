import { DATE_FORMAT_TO_SHOW } from "@/src/common/utils/dates";
import { Expose } from "class-transformer";
import dayjs from "dayjs";

export class CreateAtFilterDataModel {
  @Expose({ name: "create_at__gte" }) createdAtGte!: string;

  fromChild(dateFromDomain: string) {
    this.createdAtGte = dayjs(dateFromDomain, DATE_FORMAT_TO_SHOW).add(1, "hour").toISOString();
  }
}
