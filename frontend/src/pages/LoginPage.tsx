import { MessageIncorect, MessageNotBlank } from "@utils/MessageCommon";
import { App, Button, Col, Form, Input, Row } from "antd";
import "@styles/pages/login.scss";
import { ApiLogin } from "@services/api.auth";
import { CurrentContext } from "@hooks/CurrentAppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const currentApp = CurrentContext();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const handleSubmitForm = async (data: ILogin) => {
    setIsLoadingLogin(true);
    const res = await ApiLogin(data);
    if (res.data) {
      currentApp?.setIsAuthenticated(true);
      currentApp?.setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Login successed!");
      navigate("/");
    } else {
      message.error("Login failed!");
    }
    setIsLoadingLogin(false);
  };
  return (
    <>
      <main className="main-login centerScreen">
        <Form<ILogin>
          layout="vertical"
          className="form-login"
          onFinish={handleSubmitForm}
          labelCol={{ span: 12 }}
        >
          <Row gutter={[24, 12]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item<ILogin>
                label="Email"
                name={"username"}
                rules={[
                  {
                    required: true,
                    message: MessageNotBlank("Email"),
                  },
                  {
                    type: "email",
                    message: MessageIncorect("Email"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item<ILogin>
                label="Password"
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: MessageNotBlank("Password"),
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="btn-auth">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoadingLogin}
                >
                  Login
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </main>
    </>
  );
};
export default LoginPage;
