import { useUserProvider } from "@/src/ui/provider/user.slice";
import { useTranslation } from "react-i18next";
import Stlyed from "./home_page.styled";

export default function HomePage() {
  const { t } = useTranslation("login");
  const user = useUserProvider((state) => state.user);

  return (
    <Stlyed.HomePage>
      <Stlyed.HomePageCard>
        <h1>{t("loginSuccess.welcomeMsg", { name: user?.name })}</h1>
        <p>{t("loginSuccess.connect")}</p>
      </Stlyed.HomePageCard>
    </Stlyed.HomePage>
  );
}
