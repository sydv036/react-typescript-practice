import React from "react";

export {};

declare global {
  interface IPropsChildren {
    children: React.ReactNode;
  }
  interface IAppContext {
    user: IUser | null;
    setUser: (v: IUser) => void;
    isLoading: boolean;
    setIsLoading: (v: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
  }
}
