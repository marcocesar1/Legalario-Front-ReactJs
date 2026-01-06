import { Form, Input, Button, Alert, type FormProps } from "antd";

export type LoginFormValues = {
  email: string;
  password: string;
};

interface Props {
  error?: string;
  isLoading: boolean;
  onSubmit: (values: LoginFormValues) => void;
}

const LoginForm = ({ error, isLoading, onSubmit }: Props) => {
  const onFinish: FormProps<LoginFormValues>["onFinish"] = async (values) => {
    onSubmit(values);
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        email: "admin@test.com",
        password: "2025",
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "El email es obligatorio" },
          { type: "email", message: "Email inválido" },
        ]}
      >
        <Input placeholder="correo@ejemplo.com" />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "La contraseña es obligatoria" }]}
      >
        <Input.Password placeholder="********" />
      </Form.Item>

      {error ? (
        <Form.Item>
          <Alert title={error} type="error" />
        </Form.Item>
      ) : null}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          disabled={isLoading}
        >
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
