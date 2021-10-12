import { Form, Input, Button } from "antd";
import { useHistory, useLocation } from "react-router";
import api from "../utils/api";
import showError from "../utils/showError";
import { Result } from "antd";
import { LoginForm } from "../types/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { AppState } from "../store";
import { useEffect } from "react";
import showSuccess from "../utils/showSuccess";

function Login() {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  useEffect(() => {
    error && showError(error);
  }, [error]);

  useEffect(() => {
    data.username && showSuccess("You have successfully logged in!");
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && history.push("/");
  }, [data]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2 style={{ textAlign: "center", marginBottom: 40 }}>Please Login</h2>
      {location.state?.newSignUp && (
        <Result status="success" title="You successfully signed up!" subTitle="Please login using your credentials." />
      )}
      <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Min lenght 6 character!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
