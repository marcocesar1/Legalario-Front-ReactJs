import { Form, Input, Button, Card, Alert } from "antd";
import type { FormProps } from "antd";
import { useLoginMutation } from "../mutations/useLoginMutation";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const mutation = useLoginMutation();

  const onFinish: FormProps<LoginFormValues>["onFinish"] = async (values) => {
    mutation.mutate(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title="Iniciar sesión" style={{ width: 350 }}>
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
            rules={[
              { required: true, message: "La contraseña es obligatoria" },
            ]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          {mutation.isError ? (
            <Form.Item>
              <Alert title={mutation.error.message} type="error" />
            </Form.Item>
          ) : null}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={mutation.isPending}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
