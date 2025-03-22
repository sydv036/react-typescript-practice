import { ApiFetchUser } from "@services/api.auth";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { Spin } from "antd";

const MyContext = createContext<IAppContext | null>(null);
export const AppContext = (props: IPropsChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [percent, setPercent] = React.useState(0);

  const showLoader = () => {
    let ptg = -10;

    const interval = setInterval(() => {
      ptg += 5;
      setPercent(ptg);

      if (ptg > 120) {
        clearInterval(interval);
        setIsLoading(false);
        setPercent(0);
      }
    }, 100);
  };

  useEffect(() => {
    HandleFetchUser();
  }, []);

  const HandleFetchUser = async () => {
    setIsLoading(true);
    showLoader();
    const res = await ApiFetchUser();
    if (res.data) {
      setUser(res.data.user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <Spin spinning={isLoading} percent={percent} fullscreen />
      ) : (
        <MyContext.Provider
          value={{
            user,
            setUser,
            isLoading,
            setIsLoading,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          {props.children}
        </MyContext.Provider>
      )}
    </>
  );
};

export const CurrentContext = () => {
  const currentContext = useContext(MyContext);
  return currentContext;
};
