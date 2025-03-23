import { Container } from "@components/common/ContainerCommon";
import "@styles/layout/header-client.scss";
import {
  HomeOutlined,
  LaptopOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Input,
  MenuProps,
  Row,
  Tooltip,
} from "antd";
import { CurrentContext } from "@hooks/CurrentAppContext";
import { ButtonLoginNow } from "./components/ButtonLoginNow";
import CartProducts from "./components/CartProducts";
const items: MenuProps["items"] = [
  {
    label: "Admin manager",
    key: "1",
    icon: <LaptopOutlined />,
  },
  {
    label: "Profile",
    key: "2",
    icon: <ProfileOutlined />,
  },
  {
    label: "Logout",
    key: "3",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const HeaderClient = () => {
  const currentApp = CurrentContext();
  return (
    <>
      <header>
        <Container>
          <Row gutter={24} className="layout-header">
            <Col span={4} className="item">
              <HomeOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
            </Col>
            <Col span={12} className="item">
              <Input type="search" />
            </Col>
            <Col span={4} className="item">
              <Tooltip
                title={<CartProducts />}
                color="white"
                className="tooltip-cart"
                style={{ boxShadow: "0 0 10px black" }}
              >
                <Badge count={1}>
                  <Avatar shape="square" icon={<ShoppingCartOutlined />} />
                </Badge>
              </Tooltip>
            </Col>
            <Col span={4} className="item">
              {!currentApp?.user ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottom"
                  trigger={["hover"]}
                >
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                </Dropdown>
              ) : (
                <Tooltip
                  title={<ButtonLoginNow />}
                  color="white"
                  className="text-account"
                >
                  <span>Tài khoản</span>
                </Tooltip>
              )}
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default HeaderClient;
