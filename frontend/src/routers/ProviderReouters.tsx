import App from "App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const ProviderRouters = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <div>Login page</div>,
    },
    {
      path: "/register",
      element: <div>Register page</div>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};
export default ProviderRouters;
