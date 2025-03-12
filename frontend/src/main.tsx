import { App } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProviderRouters from "routers/ProviderRouters";
import { ProviderContext } from "hooks/AppContext";
import "nprogress/nprogress.css";
import "styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <ProviderContext>
        <ProviderRouters />
      </ProviderContext>
    </App>
  </StrictMode>
);
