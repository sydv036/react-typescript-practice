import React from "react";

export {};

declare global {
  interface IPropsChildren {
    children: React.ReactNode;
  }
  interface IAppContext {
    user: IUser | null;
    setUser: (v: IUser | null) => void;
    isLoading: boolean;
    setIsLoading: (v: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
  }
  interface IResBackend<T> {
    statusCode: number;
    message?: string;
    error?: string;
    data?: T;
  }
  interface IModelPagination<T> {
    meta: {
      current: string;
      pageSize: string;
      pages: number;
      total: number;
    };
    result?: T[];
  }

  interface IFetchUser {
    user?: IUser;
  }

  interface IResUpdateData {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId?: string;
    upsertedCount: number;
    matchedCount: number;
  }
  interface IResDeleteData {
    acknowledged: boolean;
    deletedCount: number;
  }
  interface IResBulkInsertDataErr {
    err: {
      index: number;
      code: number;
      errmsg: string;
      op: IUserTable;
    };
    index: number;
  }
  interface IResBulkInsert {
    countSuccess: number;
    countError: number;
    detail?: string | IResBulkInsertDataErr[];
  }
  interface IImage {
    uid: string;
    name: string;
    status: "done" | "error";
    url: string;
  }
}
