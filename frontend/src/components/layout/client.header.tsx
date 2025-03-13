import {
  HomeOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Col, Dropdown, Input, MenuProps, Row } from "antd";
import "styles/components/layout/client.header.scss";

const ClientHeader = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <>
      <header>
        <Row className="client-header">
          <Col span={3}>
            <HomeOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ban dang tim gi"
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  console.log("oke");
                }
              }}
            />
          </Col>
          <Col span={4}>
            <Badge count={99}>
              <ShoppingCartOutlined style={{ fontSize: "25px" }} />
            </Badge>
          </Col>
          <Col span={5}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar size={30} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </header>
    </>
  );
};
export default ClientHeader;
