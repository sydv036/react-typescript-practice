import { AppContext } from "@hooks/CurrentAppContext";
import { App, ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterProvider from "routers/RouterProvider.tsx";
import enUS from "antd/lib/locale/en_US";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <ConfigProvider locale={enUS}>
        <AppContext>
          <RouterProvider />
        </AppContext>
      </ConfigProvider>
    </App>
  </StrictMode>
);
