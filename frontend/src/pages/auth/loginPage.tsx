import { App, Button, Col, Divider, Form, Input, Row } from "antd";
import { MessageIncorrect, MessageNotBlank } from "utils/MessageCommon";
import "styles/components/auth/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentContext } from "hooks/AppContext";
import { loginAPI } from "services/auth/api.auth";

const Login = () => {
  const useContext = useCurrentContext();
  const { message } = App.useApp();
  const navigate = useNavigate();

  const handleLogin = async (value: ILogin) => {
    useContext.setIsLoading(true);
    const res = await loginAPI(value);
    console.log(res);

    if (res.data) {
      localStorage.setItem("access_token", res.data.access_token);
      useContext.setIsAuthenticated(true);
      useContext.setUser(res.data.user);
      message.success("Login thành công!");
      navigate("/");
    } else {
      message.error("Login thất bại!");
    }

    useContext.setIsLoading(false);
  };
  return (
    <>
      <Row>
        <Col xs={24} sm={12}>
          <div className="login-form">
            <fieldset>
              <legend>Login Form</legend>
              <Form name="loginForm" layout="vertical" onFinish={handleLogin}>
                <Form.Item<ILogin>
                  name={"username"}
                  label={"Email"}
                  rules={[
                    { required: true, message: MessageNotBlank("Email") },
                    {
                      type: "email",
                      message: MessageIncorrect("Email"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<ILogin>
                  label={"Password"}
                  name={"password"}
                  rules={[
                    { required: true, message: MessageNotBlank("Password") },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item className="btn-auth">
                  <Button
                    htmlType="submit"
                    type="primary"
                    loading={useContext.isLoading}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
              <Divider>Or</Divider>
              <div className="orther">
                <span>You don't have an account?</span>
                <Link to={"/register"}>SinUp</Link>
              </div>
            </fieldset>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Login;
