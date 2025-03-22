import { ApiFetchUser } from "@services/api.auth";
import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext<IAppContext | null>(null);
export const AppContext = (props: IPropsChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    HandleFetchUser();
  }, []);

  const HandleFetchUser = async () => {
    const res = await ApiFetchUser();
    if (res.data) {
      setUser(res.data.user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  return (
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
  );
};

export const CurrentContext = () => {
  const currentContext = useContext(MyContext);
  return currentContext;
};
