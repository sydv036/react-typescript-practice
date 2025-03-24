import { CurrentContext } from "@hooks/CurrentAppContext";
import { ApiLogout } from "@services/api.auth";
import { App } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HandleLogout = async () => {
  const res = await ApiLogout();
  logOut(res);
  return <></>;
};
function logOut(res: IResBackend<string>) {
  const { message, notification } = App.useApp();
  const navigate = useNavigate();
  const currentApp = CurrentContext();
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  setIsLoadingLogout(true);

  if (res.data) {
    localStorage.removeItem("access_token");
    message.success("Logout successfully!");
    currentApp?.setIsAuthenticated(false);
    currentApp?.setUser(null);
    navigate("/login");
  } else {
    notification.error({
      description: "Notification!",
      message: "An error occurred",
      duration: 3,
      showProgress: true,
    });
  }
  setIsLoadingLogout(false);
  return <>a</>;
}
