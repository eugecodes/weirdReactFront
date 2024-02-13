import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@/src/ui/styles/globals";
import { useRoutes } from "react-router-dom";

import { routes } from "@/src/ui/router/routes";
import theme from "@/src/ui/styles/theme";
import { Modal } from "@/src/ui/components/modal/modal";
import { MainLoader } from "@/src/ui/components/main_loader/main_loader";
import { SuspenseMainLoader } from "@/src/ui/components/suspense_main_loader/suspense_main_loader";

function App() {
  const page = useRoutes(routes);

  return (
    <>
      <SuspenseMainLoader>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Modal />
          <MainLoader />
          {page}
        </ThemeProvider>
      </SuspenseMainLoader>
    </>
  );
}

export default App;
