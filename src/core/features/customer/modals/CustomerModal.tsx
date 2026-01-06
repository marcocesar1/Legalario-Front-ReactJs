import { Modal, Form, Input, InputNumber, Button, Alert, Select } from "antd";
import { useCountriesQuery } from "../../country/queries/useCountriesQuery";

export interface CustomerValues {
  name: string;
  email: string;
  age: number;
  country_id: string;
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

  const query = useCountriesQuery();

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
          <InputNumber min={1} max={120} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="País"
          name="country_id"
          rules={[{ required: true, message: "El país es obligatorio" }]}
        >
          <Select
            placeholder="País"
            allowClear
            options={
              query.data
                ? query.data.data.map((c) => ({ value: c.id, label: c.name }))
                : []
            }
          />
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
