import { MessageIncorect, MessageNotBlank } from "@utils/MessageCommon";
import { App, Button, Col, Divider, Form, Input, Row } from "antd";
import "@styles/pages/register.scss";
import { Link, useNavigate } from "react-router-dom";
import { ApiRegister } from "@services/api.auth";
import { useState } from "react";

const RegisterPage = () => {
  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const { message, notification } = App.useApp();
  const navigate = useNavigate();
  const handleRegister = async (data: IRegister) => {
    setIsLoadingRegister(true);
    const res = await ApiRegister(data);
    if (res.data) {
      message.success("Registered successfully");
      navigate("/login");
    } else {
      notification.error({
        message: "Failed to registered",
        description: res.message,
      });
    }
    console.log("check res", res);
    setIsLoadingRegister(false);
  };
  return (
    <>
      <main className="main-register">
        <Form<IRegister>
          layout={"vertical"}
          className="form-register"
          onFinish={handleRegister}
        >
          <Row gutter={[24, 2]}>
            <Col span={24}>
              <Form.Item<IRegister>
                label="Full Name"
                name={"fullName"}
                rules={[
                  { required: true, message: MessageNotBlank("Full Name") },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<IRegister>
                label="Email"
                name={"email"}
                rules={[
                  { required: true, message: MessageNotBlank("Email") },
                  { type: "email", message: MessageIncorect("Email") },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<IRegister>
                label="Phone Number"
                name={"phone"}
                rules={[
                  { required: true, message: MessageNotBlank("Phone Number") },
                  {
                    type: "regexp",
                    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                    message: MessageIncorect("Phone Number"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<IRegister>
                label="Password"
                name={"password"}
                rules={[
                  { required: true, message: MessageNotBlank("Password") },
                  { min: 4, message: "Password must be at least 4 characters" },
                ]}
              >
                <Input.Password size="middle" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item className="btn-auth">
                <Button
                  type="dashed"
                  htmlType="submit"
                  loading={isLoadingRegister}
                >
                  Register
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider>Or</Divider>
        <section className="other">
          <div>
            <span>Your have an account? </span>
            <Link to={"/login"}>Login</Link>
          </div>
        </section>
      </main>
    </>
  );
};
export default RegisterPage;
