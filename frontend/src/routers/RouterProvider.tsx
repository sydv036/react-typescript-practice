import App from "App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRouters } from "./PrivateRouter";
import LoginPage from "@pages/LoginPage";

const RouterProviders = () => {
  const routers = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <div>register</div> },
    {
      path: "/admin",
      element: (
        <PrivateRouters>
          <div>admin</div>
        </PrivateRouters>
      ),
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
};
export default RouterProviders;
