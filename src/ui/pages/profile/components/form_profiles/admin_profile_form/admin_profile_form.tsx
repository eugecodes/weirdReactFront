import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";
import Styled from "./admin_profile_form.styled";

interface Props {
  className?: string;
}

export function AdminProfile({ className = "" }: Props) {
  const { t } = useTranslation("profile");

  return (
    <div className={className}>
      <h2>{t("profileData")}</h2>
      <div>
        <InputFormik label={t("columns.name")} id="name" name="name" required />
        <InputFormik label={t("columns.surnames")} id="surname" name="surname" required />
        <InputFormik label={t("columns.mail")} id="email" name="email" required />
      </div>
    </div>
  );
}

export const AdminProfileFlex = Styled.AdminProfileFlex;
export const AdminProfileGrid = Styled.AdminProfileGrid;
