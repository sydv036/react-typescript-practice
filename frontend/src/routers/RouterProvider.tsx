import App from "App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRouters } from "./PrivateRouter";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import AdminApp from "@pages/AdminApp";

const RouterProviders = () => {
  const routers = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/admin",
      element: (
        <PrivateRouters>
          <AdminApp />
        </PrivateRouters>
      ),
      children: [
        {
          index: true,
          element: <div>Dasboarh</div>,
        },
        {
          path: "user",
          element: <div>User manager</div>,
        },
        {
          path: "book",
          element: <div>Book manager</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
};
export default RouterProviders;
