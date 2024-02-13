import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isFormEmpty: boolean;
  onClickCancel: () => void;
}

export default function CreateSupplyPointButtons({ isFormEmpty, onClickCancel }: Props) {
  const { t } = useTranslation(["supply_point", "common"]);

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
