import { MessageNotBlank } from "@utils/MessageCommon";
import { Col, Form, Input, Row } from "antd";

const RegisterPage = () => {
  return (
    <>
      <main className="main-register">
        <Form<IRegister> layout={"vertical"}>
          <Row gutter={24}>
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
          </Row>
        </Form>
      </main>
    </>
  );
};
export default RegisterPage;
