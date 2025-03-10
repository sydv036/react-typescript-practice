import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProviderRouters from "routers/ProviderReouters.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderRouters />
  </StrictMode>
);
