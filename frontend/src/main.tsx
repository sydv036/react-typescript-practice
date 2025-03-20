import { AppContext } from "@hooks/CurrentAppContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterProvider from "routers/RouterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContext>
      <RouterProvider />
    </AppContext>
  </StrictMode>
);
