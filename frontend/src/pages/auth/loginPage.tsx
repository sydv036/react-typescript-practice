import { Button, Col, Divider, Form, Input, Row } from "antd";
import { MessageIncorrect, MessageNotBlank } from "utils/MessageCommon";
import "styles/components/auth/login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Row>
        <Col xs={24} sm={12}>
          <div className="login-form">
            <fieldset>
              <legend>Login Form</legend>
              <Form name="loginForm" layout="vertical" onFinish={() => {}}>
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
                  <Button htmlType="submit" type="primary">
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
