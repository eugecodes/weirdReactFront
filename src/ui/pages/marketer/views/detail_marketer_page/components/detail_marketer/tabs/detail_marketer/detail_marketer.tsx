import type { Optional } from "@/src/common/utils/types";
import type { DetailMarketerModel } from "@/src/core/marketer/domain/models/detail_marketer_model";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import paths from "@/src/ui/router/paths";
import { useTranslation } from "react-i18next";
import Styled from "./detail_marketer.styled";

interface Props {
  marketer: Optional<DetailMarketerModel>;
}

export default function DetailMarketer({ marketer }: Props) {
  const { t } = useTranslation(["marketer", "common", "address"]);

  return (
    <>
      <div>
        <Styled.MarketerData>
          <h2>{t("marketer:standarInformation")}</h2>
          <div>
            <FakeInput label={t("marketer:columns.name")} value={marketer?.name} />
            <FakeInput label={t("marketer:columns.fiscalName")} value={marketer?.fiscalName} />
            <FakeInput label={t("marketer:columns.cif")} value={marketer?.cif} />
            <FakeInput label={t("marketer:columns.email")} value={marketer?.email} />
          </div>
        </Styled.MarketerData>
      </div>
      <div>
        <Styled.MarketerData>
          <h2>{t("marketer:tabs.data")}</h2>
          <div>
            <FakeInputWithLabelCaseUnset label={t("marketer:detail.fee")} value={marketer?.fee} hasTooltip tooltipText={t("marketer:info.fee")} />
            <FakeInputWithLabelCaseUnset
              label={t("marketer:detail.maxConsume")}
              value={marketer?.maxConsume}
              hasTooltip
              tooltipText={t("marketer:info.maxConsumeRange")}
            />
          </div>
        </Styled.MarketerData>
      </div>
      <div>
        <Styled.MarketerData>
          <h2>{t("address:address")}</h2>
          <div>
            <FakeInput label={t("address:type")} value={marketer?.address?.type} />
            <FakeInput label={t("address:name")} value={marketer?.address?.name} />
            <FakeInput label={t("address:number")} value={marketer?.address?.number} />
            <FakeInput label={t("address:subdivision")} value={marketer?.address?.subdivision} />
            <FakeInput label={t("address:others")} value={marketer?.address?.others} />
            <FakeInput label={t("address:postalCode")} value={marketer?.address?.postalCode} />
            <FakeInput label={t("address:city")} value={marketer?.address?.city} />
            <FakeInput label={t("address:province")} value={marketer?.address?.province} />
          </div>
        </Styled.MarketerData>
      </div>
      <LinkAsButton to={paths.marketer.index + paths.marketer.edit + marketer?.id}>{t("common:actions.edit")}</LinkAsButton>
    </>
  );
}
