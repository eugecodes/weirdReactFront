import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isFormEmpty: boolean;
  onClickCancel: () => void;
  onClickSelectRate: () => void;
  isSelectRateDisabled: boolean;
}

export default function CreateSavingStudyButtons({ isFormEmpty, onClickCancel, onClickSelectRate, isSelectRateDisabled }: Props) {
  const { t } = useTranslation(["saving_study", "common"]);

  return (
    <div>
      <Button type="submit" variant="contained" disabled={isFormEmpty}>
        {t("common:actions.save")}
      </Button>
      <Button variant="outlined" onClick={onClickSelectRate} disabled={isSelectRateDisabled}>
        {t("saving_study:actions.selectRate")}
      </Button>
      <Button variant="text" color="secondary" onClick={onClickCancel}>
        {t("common:actions.cancel")}
      </Button>
    </div>
  );
}
