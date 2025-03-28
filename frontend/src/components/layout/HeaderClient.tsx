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
  App,
  Avatar,
  Badge,
  Col,
  Dropdown,
  Input,
  MenuProps,
  Row,
  Spin,
  Tooltip,
} from "antd";
import { CurrentContext } from "@hooks/CurrentAppContext";
import { ButtonLoginNow } from "./components/ButtonLoginNow";
import CartProducts from "./components/CartProducts";
import { DisplayImage } from "@utils/DisplayImage";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ApiLogout } from "@services/api.auth";

const HeaderClient = () => {
  const currentApp = CurrentContext();
  const { message, notification } = App.useApp();
  const navigate = useNavigate();
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

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
      label: <Link to={"/admin"}>Admin manager</Link>,
      key: "1",
      icon: <LaptopOutlined />,
    },
    {
      label: "Profile",
      key: "2",
      icon: <ProfileOutlined />,
    },
    {
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
      key: "3",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <>
      <header>
        <Container>
          <Row gutter={24} className="layout-header">
            <Col span={4} className="item">
              <HomeOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
            </Col>
            <Col span={12} className="item">
              <Input
                allowClear
                type="search"
                onKeyDown={(e) => {
                  console.log("check ", e);

                  if (e.key === "Enter" && e.target.value.trim() != "") {
                    alert("oke enter");
                  }
                }}
              />
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
              {currentApp?.user ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottom"
                  trigger={["click"]}
                >
                  {/* <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" /> */}
                  <Avatar
                    src={DisplayImage("avatar", currentApp.user.avatar)}
                  />
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
