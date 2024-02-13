import type { Optional } from "@/src/common/utils/types";
import type { DetailContractModel } from "@/src/core/contract/domain/models/detail_contract_model";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import Styled from "./detail_contract.styled";
import { getContractStatus } from "@/src/ui/utils";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

interface Props {
  contract: Optional<DetailContractModel>;
}

export default function DetailContract({ contract }: Props) {
  const { t } = useTranslation(["contract", "common", "address"]);

  return (
    <>
      <div>
        <Styled.ContractData>
          <h2>{t("contract:form.titles.data")}</h2>
          <div>
            <FakeInput label={t("contract:columns.status")} value={getContractStatus(String(contract?.status))} />
            {contract?.statusMessage && <FakeInput label={t("contract:columns.statusMessage")} value={contract?.statusMessage} />}
          </div>
        </Styled.ContractData>
      </div>
      <div>
        <Styled.ContractData>
          <h2>{t("contract:form.titles.client")}</h2>
          <div>
            <FakeInput label={t("contract:columns.clientAlias")} value={contract?.supplyPoint?.client?.alias} />
            <FakeInput label={t("contract:columns.client")} value={contract?.supplyPoint?.client?.fiscalName} />
            <FakeInput label={t("contract:columns.cif")} value={contract?.supplyPoint?.client?.cif} />
          </div>
        </Styled.ContractData>
      </div>
      <div>
        <Styled.ContractData>
          <h2>{t("contract:form.titles.supplyPoint")}</h2>
          <div>
            <FakeInput label={t("contract:columns.alias")} value={contract?.supplyPoint?.alias} />
            <FakeInput label={t("contract:columns.cups")} value={contract?.supplyPoint?.cups} />
            <FakeInput label={t("contract:columns.energyType")} value={contract?.supplyPoint?.energyType} />
          </div>
          <h2>{t("contract:form.titles.address")}</h2>
          <div>
            <FakeInput label={t("contract:columns.supplyAddress")} value={contract?.supplyPoint?.supplyAddress} />
            <FakeInput label={t("contract:columns.supplyPostalCode")} value={contract?.supplyPoint?.supplyPostalCode} />
            <FakeInput label={t("contract:columns.supplyCity")} value={contract?.supplyPoint?.supplyCity} />
            <FakeInput label={t("contract:columns.supplyProvince")} value={contract?.supplyPoint?.supplyProvince} />
          </div>
        </Styled.ContractData>
      </div>
      <div>
        <Styled.ContractData>
          <h2>{t("contract:form.titles.rate")}</h2>
          <div>
            <FakeInput label={t("contract:columns.rateType")} value={contract?.rate?.rateType?.name} />
            <FakeInput label={t("contract:columns.rateName")} value={contract?.rate?.name} />
          </div>
        </Styled.ContractData>
      </div>
      <div>
        <Styled.ContractData>
          {contract?.rate?.rateType?.energyType === EnergyTypes.LIGHT ? (
            <>
              <h2>{t("contract:form.titles.power")}</h2>
              <div>
                <FakeInput label={t("contract:columns.power1")} value={contract?.power1} />
                <FakeInput label={t("contract:columns.power2")} value={contract?.power2} />
                <FakeInput label={t("contract:columns.power3")} value={contract?.power3} />
              </div>
              <div>
                <FakeInput label={t("contract:columns.power4")} value={contract?.power4} />
                <FakeInput label={t("contract:columns.power5")} value={contract?.power5} />
                <FakeInput label={t("contract:columns.power6")} value={contract?.power6} />
              </div>
            </>
          ) : null}
        </Styled.ContractData>
      </div>

      <LinkAsButton to={paths.contract.index + paths.contract.edit + contract?.id}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
