import { createContext, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  user: IUser | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (value: IUser) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
const AppContext = createContext<IAppContext | null>(null);
export const ProviderContext = (props: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useCurrentContext = (): IAppContext => {
  const currentUseContext = useContext(AppContext);
  if (!currentUseContext) {
    throw new Error("useCurrentContext has not defined");
  }
  return currentUseContext;
};
