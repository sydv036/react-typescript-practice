import HomePage from "components/client/HomePage";
import AdminApp from "pages/admin/AdminApp";
import Login from "pages/auth/loginPage";
import Register from "pages/auth/registerPage";
import IndexApp from "pages/client/IndexApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const ProviderRouters = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexApp />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminApp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};
export default ProviderRouters;
