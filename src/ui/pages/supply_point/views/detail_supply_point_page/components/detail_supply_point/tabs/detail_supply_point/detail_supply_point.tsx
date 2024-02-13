import type { Optional } from "@/src/common/utils/types";
import type { DetailSupplyPointModel } from "@/src/core/supply_point/domain/models/detail_supply_point_model";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import Styled from "./detail_supply_point.styled";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { CounterTypes } from "@/src/core/app/enums/counter_types";
import { OwnerTypes } from "@/src/core/app/enums/owner_types";

interface Props {
  supply_point: Optional<DetailSupplyPointModel>;
}

export default function DetailSupplyPoint({ supply_point }: Props) {
  const { t } = useTranslation(["supply_point", "common", "address"]);

  return (
    <>
      <div>
        <Styled.SupplyPointData>
          <h2>{t("supply_point:data")}</h2>
          <div>
            <FakeInput label={t("supply_point:columns.client")} value={supply_point?.client?.fiscalName} />
            <FakeInput label={t("supply_point:columns.alias")} value={supply_point?.alias} />
            <FakeInput label={t("supply_point:columns.cups")} value={supply_point?.cups} />
            <FakeInput
              label={t("supply_point:columns.energyType")}
              value={supply_point?.energyType === EnergyTypes.LIGHT ? t("common:energyType.electricity") : t("common:energyType.gas")}
            />
          </div>
        </Styled.SupplyPointData>
      </div>
      <div>
        <Styled.SupplyPointData>
          <h2>{t("supply_point:form.titles.address")}</h2>
          <div>
            <FakeInput label={t("supply_point:columns.supplyAddress")} value={supply_point?.supplyAddress} />
            <FakeInput label={t("supply_point:columns.supplyPostalCode")} value={supply_point?.supplyPostalCode} />
            <FakeInput label={t("supply_point:columns.supplyCity")} value={supply_point?.supplyCity} />
            <FakeInput label={t("supply_point:columns.supplyProvince")} value={supply_point?.supplyProvince} />
          </div>
        </Styled.SupplyPointData>
      </div>
      <div>
        <Styled.SupplyPointData>
          <h2>{t("supply_point:form.titles.invoicing")}</h2>
          <div>
            <FakeInput label={t("supply_point:columns.bankAccountHolder")} value={supply_point?.bankAccountHolder} />
            <FakeInput label={t("supply_point:columns.bankAccountNumber")} value={supply_point?.bankAccountNumber} />
            <FakeInput label={t("supply_point:columns.fiscalAddress")} value={supply_point?.fiscalAddress} />
          </div>
        </Styled.SupplyPointData>
      </div>
      <div>
        <Styled.SupplyPointData>
          <h2>{t("supply_point:form.titles.counter")}</h2>
          <div>
            <FakeInput
              label={t("supply_point:columns.counterType")}
              value={supply_point?.counterType === CounterTypes.NORMAL ? t("common:counterType.normal") : t("common:counterType.telematic")}
            />
            <FakeInput
              label={t("supply_point:columns.counterProperty")}
              value={
                supply_point?.counterProperty === OwnerTypes.SELF
                  ? t("common:ownerType.self")
                  : supply_point?.counterProperty === OwnerTypes.MARKETER
                  ? t("common:ownerType.marketer")
                  : t("common:ownerType.other")
              }
            />
            <FakeInput label={t("supply_point:columns.counterPrice")} value={supply_point?.counterPrice} />
          </div>
        </Styled.SupplyPointData>
      </div>
      <div>
        <Styled.SupplyPointData>
          <h2>{t("supply_point:form.titles.others")}</h2>
          <div>
            <FakeInput label={t("supply_point:columns.maxAvailablePower")} value={supply_point?.maxAvailablePower} />
            <FakeInput label={t("supply_point:columns.voltage")} value={supply_point?.voltage} />
            <FakeInput label={t("supply_point:columns.isRenewable")} value={supply_point?.isRenewable === true ? t("common:yes") : t("common:no")} />
          </div>
        </Styled.SupplyPointData>
      </div>
      <LinkAsButton to={paths.supplyPoint.index + paths.supplyPoint.edit + supply_point?.id}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
