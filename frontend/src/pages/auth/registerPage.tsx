import { App, Button, Divider, Form, Input } from "antd";
import { MessageIncorrect, MessageNotBlank } from "utils/MessageCommon";
import "styles/components/auth/register.scss";
import { Link } from "react-router-dom";
import { registerAPI } from "services/auth/api.auth";
import { useCurrentContext } from "hooks/AppContext";

const Register = () => {
  const [formRegister] = Form.useForm();
  const { message, notification } = App.useApp();
  const useContext = useCurrentContext();
  const handleRegister = async (value: IRegister) => {
    useContext.setIsLoading(true);
    const res = await registerAPI(value);
    if (res.data) {
      message.success("Đăng kí User thành công!");
    } else {
      notification.error({
        message: "Đăng kí User thất bại!",
        description: res.message,
      });
    }
    useContext.setIsLoading(false);
  };

  return (
    <div className="register-form">
      <Form<IRegister>
        form={formRegister}
        layout={"vertical"}
        onFinish={handleRegister}
      >
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
          rules={[
            { required: true, message: MessageNotBlank("Phone Number") },
            // {
            //   pattern: /(84[3|5|7|8|9])+([0-9]{8})\b/g,
            //   message: MessageIncorrect("Phone Number Viet Nam"),
            // },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="btn-auth">
          <Button
            htmlType="submit"
            type="primary"
            loading={useContext.isLoading}
          >
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
