import ClientHeader from "components/layout/client.header";
import { Outlet } from "react-router-dom";

const IndexApp = () => {
  return (
    <>
      <ClientHeader />
      <Outlet />
    </>
  );
};
export default IndexApp;
