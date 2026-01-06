import { Modal, Form, Input, InputNumber, Button, Alert } from "antd";

export interface CustomerValues {
  name: string;
  email: string;
  age: number;
  country: string;
}

interface CustomerModalProps {
  error?: string;
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: (values: CustomerValues) => void;
  onCancel: () => void;
}

export default function CustomerModal({
  error,
  isOpen,
  onSubmit,
  onCancel,
  isLoading,
}: CustomerModalProps) {
  const [form] = Form.useForm<CustomerValues>();

  const handleFinish = (values: CustomerValues) => {
    onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Crear cliente"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "El email es obligatorio" },
            { type: "email", message: "Email inválido" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Edad"
          name="age"
          rules={[{ required: true, message: "La edad es obligatoria" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="País"
          name="country"
          rules={[
            { required: true, message: "El país es obligatorio" },
            {
              len: 3,
              message: "El país debe tener exactamente 3 caracteres",
            },
          ]}
        >
          <Input placeholder="Ej: MEX, USA, ESP" />
        </Form.Item>

        {error ? (
          <Form.Item>
            <Alert title={error} type="error" />
          </Form.Item>
        ) : null}

        <Form.Item style={{ textAlign: "right" }}>
          <Button
            onClick={handleCancel}
            style={{ marginRight: 8 }}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
