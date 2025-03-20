import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RouterProviders = () => {
  const routers = createBrowserRouter([
    { path: "/", element: <div>home</div> },
    { path: "/login", element: <div>login</div> },
    { path: "/register", element: <div>register</div> },
    { path: "/admin", element: <div>admin</div> },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
};
export default RouterProviders;
