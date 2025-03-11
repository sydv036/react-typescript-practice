import { Button, Divider, Form, Input } from "antd";
import { MessageIncorrect, MessageNotBlank } from "utils/MessageCommon";
import "styles/components/auth/register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-form">
      <Form<IRegister> layout={"vertical"}>
        <h1 className="orther">Register</h1>
        <Form.Item<IRegister>
          label={"Full Name"}
          name={"fullName"}
          rules={[{ required: true, message: MessageNotBlank("Full Name") }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<IRegister>
          label={"Email"}
          name={"email"}
          rules={[
            { required: true, message: MessageNotBlank("Email") },
            { type: "email", message: MessageIncorrect("Email") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<IRegister>
          label={"Password"}
          name={"password"}
          rules={[{ required: true, message: MessageNotBlank("Password") }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<IRegister>
          label={"Phone Number"}
          name={"phone"}
          rules={[{ required: true, message: MessageNotBlank("Phone Number") }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="btn-auth">
          <Button htmlType="submit" type="primary">
            Register
          </Button>
        </Form.Item>
        <Divider>Or</Divider>
        <div className="orther">
          <span>You have an account?</span>
          <Link to={"/login"}>Login</Link>
        </div>
      </Form>
    </div>
  );
};
export default Register;
