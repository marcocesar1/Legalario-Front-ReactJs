import { Table, Input, Select, Space, Card, Button, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useState } from "react";
import { useCustomersQuery } from "../queries/useCustomersQuery";
import type { Customer } from "../customer.model";
import { useCountriesQuery } from "../../country/queries/useCountriesQuery";
import { useDebounce } from "../../../hooks/useDebounce";
import CustomerModal, { type CustomerValues } from "../modals/CustomerModal";
import { useCustomerMutation } from "../mutations/useCustomerMutation";
import useAuthStore from "../../auth/store/useAuthStore";

const { Search } = Input;

export default function CustomerList() {
  const authStore = useAuthStore();

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const countriesquery = useCountriesQuery();
  const customersQuery = useCustomersQuery({
    page,
    country,
    search: debouncedSearch,
    per_page: perPage,
  });

  const mutation = useCustomerMutation();

  const columns: ColumnsType<Customer> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Edad", dataIndex: "age", key: "age" },
    { title: "País", dataIndex: "country", key: "country" },
  ];

  const pagination: TablePaginationConfig = {
    current: customersQuery.data?.metadata.current_page,
    pageSize: customersQuery.data?.metadata.per_page,
    total: customersQuery.data?.metadata.total,
    showSizeChanger: true,
    onChange: (page, pageSize) => {
      setPage(page);
      setPerPage(pageSize ?? 5);
    },
    pageSizeOptions: ["10", "20", "50"],
  };

  const handleCreateCustomer = (values: CustomerValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        message.success("Registro creado exitosamente");
        setIsModalOpen(false);
      },
    });
  };

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
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />

        <Select
          placeholder="Filtrar por país"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setCountry(value)}
          options={
            countriesquery.data
              ? countriesquery.data.data.map((c) => ({ value: c, label: c }))
              : []
          }
        />
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ marginRight: 8 }}
        >
          Crear nuevo
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={customersQuery.data ? customersQuery.data.data : []}
        loading={customersQuery.isLoading}
        pagination={pagination}
      />

      <CustomerModal
        error={mutation.error?.message}
        isOpen={isModalOpen}
        onSubmit={handleCreateCustomer}
        onCancel={() => setIsModalOpen(false)}
        isLoading={mutation.isPending}
      />
    </Card>
  );
}
