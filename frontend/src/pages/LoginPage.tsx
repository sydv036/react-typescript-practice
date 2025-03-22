import { MessageIncorect, MessageNotBlank } from "@utils/MessageCommon";
import { Button, Col, Form, Input, Row } from "antd";
import "@styles/pages/login.scss";
import { ApiLogin } from "@services/api.auth";
const LoginPage = () => {
  const handleSubmitForm = async (data: ILogin) => {
    const res = await ApiLogin(data);
    console.log("check login res", res);
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
                <Button type="primary" htmlType="submit">
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
