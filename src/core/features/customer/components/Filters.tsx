import { Input, Select, Space, Card, Button } from "antd";
import useAuthStore from "../../auth/store/useAuthStore";
import { useCountriesQuery } from "../../country/queries/useCountriesQuery";

const { Search } = Input;

interface Props {
  onChangeSearch: (search: string) => void;
  onChangeCountry: (country: string) => void;
  onCreateCustomer: (val: boolean) => void;
}

export default function Filters({
  onChangeSearch,
  onChangeCountry,
  onCreateCustomer,
}: Props) {
  const authStore = useAuthStore();

  const query = useCountriesQuery();

  return (
    <Card title="Usuarios">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="default"
          onClick={() => authStore.logout()}
          style={{ marginRight: 8 }}
        >
          Cerrar sesión
        </Button>
      </div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Search
          placeholder="Buscar por nombre o email"
          allowClear
          onChange={(e) => onChangeSearch(e.target.value)}
          style={{ width: 250 }}
        />

        <Select
          placeholder="Filtrar por país"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => onChangeCountry(value)}
          options={
            query.data
              ? query.data.data.map((c) => ({ value: c, label: c }))
              : []
          }
        />
        <Button
          type="primary"
          onClick={() => onCreateCustomer(true)}
          style={{ marginRight: 8 }}
        >
          Crear nuevo
        </Button>
      </Space>
    </Card>
  );
}
