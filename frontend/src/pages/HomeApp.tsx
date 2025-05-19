import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  FilterOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, TabsProps } from "antd";
import {
  Breadcrumb,
  Checkbox,
  Divider,
  Layout,
  Menu,
  Radio,
  Tabs,
  theme,
} from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const itemsTab: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const HomeApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <h1>
          Bộ lọc tìm kiếm <FilterOutlined />
        </h1>
        <div className="demo-logo-vertical" />
        {/* <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        /> */}
        <Menu>
          <section>
            <div>Theo danh mục</div>
            <Checkbox.Group
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Checkbox value="A">A</Checkbox>
              <Checkbox value="B">B</Checkbox>
              <Checkbox value="C">C</Checkbox>
              <Checkbox value="D">D</Checkbox>
            </Checkbox.Group>
          </section>
          <Divider />
          <section>
            <div>Theo danh mục</div>
            <div>
              <Checkbox.Group
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Checkbox value="A">A</Checkbox>
                <Checkbox value="B">B</Checkbox>
                <Checkbox value="C">C</Checkbox>
                <Checkbox value="D">D</Checkbox>
              </Checkbox.Group>
            </div>
          </section>
        </Menu>
      </Sider>
      <Layout style={{ backgroundColor: "white" }}>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Tabs defaultActiveKey="1" items={itemsTab} />
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeApp;
