import type { Id } from "@/src/common/utils/types";
import { Business, Delete } from "@/src/ui/assets/icons";
import DetailPageHeader from "@/src/ui/components/detail_page_header/detail_page_header";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import LinkAsButton from "@/src/ui/components/LinkAsButton/link_as_button";
import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationMarketerMarginProvider } from "@/src/ui/pages/marketer_margin/provider/mutation_marketer_margin.provider";
import Styled from "./detail_marketer_margin_page.styled";

import { MarginType } from "@/src/core/app/enums/margin_type";
import MarketerMarginController from "@/src/ui/pages/marketer_margin/controllers/marketer_margin_controller";
import { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { getTabResourcePath } from "@/src/ui/utils";

export default function DetailMarketerMarginPage() {
  const { t } = useTranslation(["marketer_margin", "common"]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { marketerMarginId } = useParams();
  const marketerMargin = useMutationMarketerMarginProvider((state) => state.item);
  const getMarketerMarginById = useMutationMarketerMarginProvider((state) => state.getById);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  const onCloseModal = useCallback(() => setShowModal(false), []);

  const resourcePath = getTabResourcePath(MARKETER_TABS_QUERY_PARAMS.MARGIN, marketerMargin?.marketerId);

  const getMarketerMargin = useCallback(async () => {
    if (marketerMarginId) {
      const id = Number(marketerMarginId);
      await getMarketerMarginById(id);
    }
  }, [getMarketerMarginById, marketerMarginId]);

  const onClickDelete = useCallback(
    (id: Id) => {
      setShowModal(true);

      const newModalData: ModalData = {
        description: t("marketer_margin:sure.delete"),
        primaryModalButtonText: t("common:actions.remove"),
        onClickPrimaryButton: async () => {
          await MarketerMarginController.delete(id);
          onCloseModal();
          showToast({ message: t("marketer_margin:actions.deleted") });
          navigate(resourcePath);
        }
      };
      setModalData(newModalData);
    },
    [navigate, onCloseModal, t, showToast, resourcePath]
  );

  useEffect(() => {
    getMarketerMargin();
  }, [getMarketerMargin]);

  const actions = useMemo(
    () =>
      marketerMargin
        ? [
            {
              Icon: Delete,
              text: t("marketer_margin:actions.delete"),
              onClick: () => onClickDelete(Number(marketerMarginId))
            }
          ]
        : [],
    [marketerMargin, onClickDelete, marketerMarginId, t]
  );

  return (
    <Styled.Page>
      <DetailPageHeader
        Icon={Business}
        showBreadcrumbs
        resourcePath={resourcePath}
        resourceName={t("marketer_margin:marketerMargin")}
        headerText={marketerMargin?.rate ? marketerMargin.rate.name : ""}
        creationInformation={marketerMargin ? marketerMargin.creationData() : undefined}
        actions={actions}
        showModal={showModal}
        onCloseModal={onCloseModal}
        modalPrimaryButtonText={modalData?.primaryModalButtonText}
        modalDescription={modalData?.description}
        onPrimaryButtonClick={modalData?.onClickPrimaryButton}
      />
      <Styled.Data>
        <Styled.MarketerMarginData>
          <h2>{t("marketer_margin:data")}</h2>
          <div>
            <FakeInput label={t("marketer_margin:columns.rate")} value={marketerMargin?.rate?.name} />
            <FakeInput
              label={t("marketer_margin:columns.type")}
              value={marketerMargin?.type === MarginType.CONSUME_RANGE ? t("common:marginType.consumeRange") : t("common:marginType.rateType")}
            />
            {marketerMargin?.type === MarginType.RATE_TYPE && (
              <FakeInput label={t("marketer_margin:columns.rateType")} value={marketerMargin?.rateType?.name} />
            )}
            {marketerMargin?.type === MarginType.CONSUME_RANGE && (
              <>
                <FakeInputWithLabelCaseUnset label={t("marketer_margin:columns.minConsumeUnit")} value={marketerMargin?.minConsume} />
                <FakeInputWithLabelCaseUnset label={t("marketer_margin:columns.maxConsumeUnit")} value={marketerMargin?.maxConsume} />
              </>
            )}

            <FakeInputWithLabelCaseUnset label={t("marketer_margin:columns.minMarginUnit")} value={marketerMargin?.minMargin} />
            <FakeInputWithLabelCaseUnset label={t("marketer_margin:columns.maxMarginUnit")} value={marketerMargin?.maxMargin} />
          </div>
        </Styled.MarketerMarginData>
      </Styled.Data>
      <LinkAsButton to={paths.marketerMargin.index + paths.marketerMargin.edit + marketerMarginId}>{t("common:actions.edit")}</LinkAsButton>
    </Styled.Page>
  );
}
