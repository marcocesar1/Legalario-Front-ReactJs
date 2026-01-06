import { Card } from "antd";

import { useLoginMutation } from "../mutations/useLoginMutation";
import LoginForm, { type LoginFormValues } from "../components/LoginForm";

const LoginPage = () => {
  const mutation = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="login-wrapper">
      <Card title="Iniciar sesión" className="login_card">
        <LoginForm
          error={mutation.error?.message}
          isLoading={mutation.isPending}
          onSubmit={onSubmit}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
