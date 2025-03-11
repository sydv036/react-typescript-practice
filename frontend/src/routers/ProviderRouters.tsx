import App from "App";
import Login from "pages/auth/loginPage";
import Register from "pages/auth/registerPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const ProviderRouters = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
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
