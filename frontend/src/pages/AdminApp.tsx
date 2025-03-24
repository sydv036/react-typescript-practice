import {
  AliwangwangOutlined,
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "@styles/pages/admin-app.scss";

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
const arrMenuInfo = [
  <Link to={"/"}>
    <HomeOutlined /> Home Page
  </Link>,
  <Link to={"/admin/user"}>
    <UserOutlined /> User Management
  </Link>,
  <Link to={"/admin/book"}>
    <BookOutlined /> Book Management
  </Link>,
  <div
    onClick={() => {
      alert("handle logout");
    }}
  >
    <LogoutOutlined /> Logout
  </div>,
];
const items: MenuProps["items"] = arrMenuInfo.map((item, index) => {
  return { key: index + 1, label: item };
});

const AdminApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
