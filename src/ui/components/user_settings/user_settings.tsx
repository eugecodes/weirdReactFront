import { Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Arrow } from "@/src/ui/assets/icons";
import { useUserProvider } from "@/src/ui/provider/user.slice";
import Styled from "./user_settings.styled";
import paths from "@/src/ui/router/paths";

export default function UserSettings() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useUserProvider((state) => state.user)!;
  const logout = useUserProvider((state) => state.logout);
  const popUpRef = useRef<HTMLDivElement>(null);

  const onClickModal = useCallback(() => {
    setShowPopUp((prevState) => !prevState);
  }, []);

  const redirectToChangePassword = useCallback(() => {
    setShowPopUp(false);
    navigate(paths.profile.index + paths.profile.changePassword);
  }, [navigate]);

  const redirectToEditProfile = useCallback(() => {
    setShowPopUp(false);
    navigate(paths.profile.index + paths.profile.edit + user.id);
  }, [navigate, user]);

  const onLogout = useCallback(async () => {
    await logout();
    navigate(paths.auth.login, { state: { skipMiddleware: true } });
  }, [navigate, logout]);

  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => {
      const target = (event.target as Node) || {};
      const isOutsidePopUp = popUpRef.current && !popUpRef.current.contains(target);

      if (isOutsidePopUp) {
        setShowPopUp(false);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [popUpRef, onClickModal]);

  return (
    <Styled.UserSettingsWrapper ref={popUpRef}>
      <Styled.UserSettings onClick={onClickModal}>
        <Styled.UserImg>{user.getNameInitial()}</Styled.UserImg>
        <Arrow />
      </Styled.UserSettings>
      <Styled.UserSettingsPopUp isOpen={showPopUp}>
        <Styled.UserSettingsInfoWrapper>
          <Styled.UserImg>{user.getNameInitial()}</Styled.UserImg>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <span>Admin</span>
          </div>
        </Styled.UserSettingsInfoWrapper>
        <Styled.UserSettingsLinksWrapper>
          <Button variant="text" onClick={redirectToEditProfile}>
            {t("auth.editProfile")}
          </Button>
          <Button variant="text" onClick={redirectToChangePassword}>
            {t("auth.changePassword")}
          </Button>
          <Button variant="text" onClick={onLogout}>
            {t("auth.logOut")}
          </Button>
        </Styled.UserSettingsLinksWrapper>
      </Styled.UserSettingsPopUp>
    </Styled.UserSettingsWrapper>
  );
}
