import {
  AliwangwangOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Spin,
  theme,
} from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "@styles/pages/admin-app.scss";
import { ApiLogout } from "@services/api.auth";
import { CurrentContext } from "@hooks/CurrentAppContext";

const { Header, Sider, Content } = Layout;

const itemsMenu = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "User",
    children: [
      {
        key: "user",
        label: <Link to={"/admin/user"}>User management</Link>,
      },
    ],
  },
  {
    key: "2",
    icon: <BookOutlined />,
    label: <Link to={"/admin/book"}>Book</Link>,
  },
  {
    key: "3",
    icon: <AliwangwangOutlined />,
    label: "Other",
  },
];

const AdminApp = () => {
  const { message, notification } = App.useApp();
  const navigate = useNavigate();
  const currentApp = CurrentContext();
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const HandleLogout = async () => {
    setIsLoadingLogout(true);
    const res = await ApiLogout();
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
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <Link to={"/"}>Home Page</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 2,
      label: <Link to={"/admin/user"}>User Management</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 3,
      label: <Link to={"/admin/book"}>Book Management</Link>,
      icon: <BookOutlined />,
    },
    {
      key: 4,
      label: (
        <Spin spinning={isLoadingLogout}>
          <div
            onClick={() => {
              HandleLogout();
            }}
          >
            Logout
          </div>
        </Spin>
      ),
      icon: <LogoutOutlined />,
      danger: true,
      disabled: isLoadingLogout,
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="demo-logo-vertical text-admin">
          <Link color="black" to={"/admin"}>
            Admin
          </Link>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={itemsMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown trigger={["click"]} menu={{ items }}>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminApp;
