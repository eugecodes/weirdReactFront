import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";
import Styled from "./create_edit_energy_cost_form.styled";
import { useUserProvider } from "@/src/ui/provider/user.slice";

interface Props {
  className?: string;
  isProtected?: boolean;
}

export function CreateEditEnergyCostForm({ className = "", isProtected = false }: Props) {
  const { t } = useTranslation("energy_cost");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useUserProvider((state) => state.user)!;

  return (
    <div className={className}>
      <InputFormik label={t("columns.concept")} id="concept" name="concept" required disabled={isProtected && !user.isSuperadmin} />
      <InputFormik label={t("columns.amount")} id="amount" name="amount" required />
    </div>
  );
}

export const CreateEditEnergyCostFormFlex = Styled.CreateEditEnergyCostFlex;
export const CreateEditEnergyCostFormGrid = Styled.CreateEditEnergyCostGrid;
