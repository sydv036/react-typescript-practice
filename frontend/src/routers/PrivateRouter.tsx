import { CurrentContext } from "@hooks/CurrentAppContext";
import { Button, Result } from "antd";
import { RoleEnum } from "enums/RoleEnum";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const PrivateRouters = (props: IPropsChildren) => {
  const location = useLocation();
  const currentApp = CurrentContext();

  if (!currentApp?.isAuthenticated) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );
  }

  if (location.pathname.includes("/admin")) {
    if (currentApp.user?.role != RoleEnum.ADMIN) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link to={"/"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      );
    }
  }

  return props.children;
};
