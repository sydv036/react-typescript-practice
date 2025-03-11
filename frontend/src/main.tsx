import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProviderRouters from "routers/ProviderRouters";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderRouters />
  </StrictMode>
);
