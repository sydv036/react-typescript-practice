import {
  Breadcrumb,
  Checkbox,
  Divider,
  Layout,
  Menu,
  Rate,
  Slider,
  theme,
} from "antd";

const { Content, Footer, Sider } = Layout;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const checkBoxList = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "G", value: "G" },
];

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuItem[] = [
    {
      label: "Phổ biến",
      key: "pb",
    },
    {
      label: "Hàng mới",
      key: "new",
    },
    {
      label: "Giá cao đến thấp",
      key: "desc",
    },
    {
      label: "Giá thấp đến cao",
      key: "asc",
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                padding: "10px",
              }}
              //   items={items2}
            >
              <div>
                {/* <p>Bộ lọc tìm kiếm</p> */}
                <span>Danh mục sản phẩm</span>
                <Divider />
                <Checkbox.Group
                  options={checkBoxList}
                  style={{ display: "flex", flexDirection: "column" }}
                />
              </div>
              <div>
                <Divider />
                <span>Khoảng giá</span>
                <div>
                  <Slider range defaultValue={[1, 100]} />
                </div>
              </div>
              <div>
                <Divider />
                <div>Đánh giá</div>
                <Rate tooltips={desc} value={5} />
                <Rate tooltips={desc} value={4} />
                <Rate tooltips={desc} value={3} />
                <Rate tooltips={desc} value={2} />
                <Rate tooltips={desc} value={1} />
              </div>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Menu
              //   onClick={onClick}
              //   selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by SyDV
      </Footer>
    </Layout>
  );
};
export default HomePage;
