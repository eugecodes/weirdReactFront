import Styled from "@/src/ui/components/base_layout/base_layout.styled";
import Header from "@/src/ui/components/header/header";
import Sidebar from "@/src/ui/components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import ToastHandler from "../toast_handler/toast_handler";

export const BaseLayout = () => {
  return (
    <Styled.Wrapper>
      <Header />
      <Sidebar />
      <ToastHandler />
      <Outlet />
    </Styled.Wrapper>
  );
};
