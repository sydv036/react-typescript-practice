import App from "App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRouters } from "./PrivateRouter";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import AdminApp from "@pages/AdminApp";
import UserTable from "@components/admin/user/user.table";
import DashBoardAdmin from "@styles/components/admin/dashboard";

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
          element: <DashBoardAdmin />,
        },
        {
          path: "user",
          element: <UserTable />,
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
