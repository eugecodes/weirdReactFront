import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetContactDetailUseCase {
  @inject(TYPES.IContactRepository) private readonly provider!: IocProvider<IContactRepository>;

  async execute(rateTypeId: Id) {
    const repository = await this.provider();
    return repository.detailContact(rateTypeId);
  }
}
