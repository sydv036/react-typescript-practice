import { AppContext } from "@hooks/CurrentAppContext";
import { App } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterProvider from "routers/RouterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <AppContext>
        <RouterProvider />
      </AppContext>
    </App>
  </StrictMode>
);
