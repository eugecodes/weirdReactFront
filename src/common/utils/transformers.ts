import { PageableDataModel } from "@/src/core/app/data/models/page_data_model";
import { instanceToPlain, plainToClassFromExist, plainToInstance } from "class-transformer";
import type { ClassConstructor, TransformFnParams } from "class-transformer/types/interfaces";
import type { DataModel } from "../interfaces/data_model";

export const transformerDefaultOptions = { excludeExtraneousValues: true };

export function toJson<T>(object: T) {
  return instanceToPlain(object, transformerDefaultOptions);
}
export function fromJson<T, V>(cls: ClassConstructor<T>, plain: V) {
  return plainToInstance(cls, plain, transformerDefaultOptions);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromJsonPage = <DataType extends DataModel<DomainType>, DomainType>(model: ClassConstructor<DataType>, json: Record<string, unknown>) =>
  plainToClassFromExist(new PageableDataModel<DataType, DomainType>(model), json, { excludeExtraneousValues: true });

export const fromOptionsToId = ({ value }: TransformFnParams) => value?.map(({ id }: { id: number }) => id).join(",");

export const optionToId = ({ value }: TransformFnParams) => value?.id;
