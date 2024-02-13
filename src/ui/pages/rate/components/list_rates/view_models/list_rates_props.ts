import type { ModalData } from "@/src/ui/components/sure_modal/sure_modal";
import type { Dispatch, SetStateAction } from "react";

export interface ListRatesProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setModalData: Dispatch<SetStateAction<ModalData | undefined>>;
  withMarketerId?: boolean;
}
