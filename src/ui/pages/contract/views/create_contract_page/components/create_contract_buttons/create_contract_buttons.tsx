import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isFormEmpty: boolean;
  onClickCancel: () => void;
}

export default function CreateContractButtons({ isFormEmpty, onClickCancel }: Props) {
  const { t } = useTranslation(["contract", "common"]);

  return (
    <div>
      <Button type="submit" variant="contained" disabled={isFormEmpty}>
        {t("common:actions.save")}
      </Button>
      <Button variant="text" color="secondary" onClick={onClickCancel}>
        {t("common:actions.cancel")}
      </Button>
    </div>
  );
}
