import { Table, Input, Select, Space, Card } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useState } from "react";
import { useCustomersQuery } from "../queries/useCustomersQuery";
import type { Customer } from "../customer.model";
import { useCountriesQuery } from "../../country/queries/useCountriesQuery";
import { useDebounce } from "../../../hooks/useDebounce";

const { Search } = Input;

export default function CustomerList() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  const query = useCustomersQuery({
    page,
    country,
    search: debouncedSearch,
    per_page: perPage,
  });
  const countriesquery = useCountriesQuery();

  const columns: ColumnsType<Customer> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Edad", dataIndex: "age", key: "age" },
    { title: "País", dataIndex: "country", key: "country" },
  ];

  const pagination: TablePaginationConfig = {
    current: query.data?.metadata.current_page,
    pageSize: query.data?.metadata.per_page,
    total: query.data?.metadata.total,
    showSizeChanger: true,
    onChange: (page, pageSize) => {
      setPage(page);
      setPerPage(pageSize ?? 5);
    },
    pageSizeOptions: ["10", "20", "50"],
  };

  return (
    <Card title="Usuarios">
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
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={query.data ? query.data.data : []}
        loading={query.isLoading}
        pagination={pagination}
      />
    </Card>
  );
}
