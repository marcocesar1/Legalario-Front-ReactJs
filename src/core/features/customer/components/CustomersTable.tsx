import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Customer } from "../customer.model";
import type { Pagination } from "../../../types/pagination";

interface Props {
  isLoading?: boolean;
  metadata?: Pagination;
  data?: Customer[];
  onChangePage: (page: number, perPage: number) => void;
}

export default function CustomersTable({
  metadata,
  isLoading,
  data,
  onChangePage,
}: Props) {
  const columns: ColumnsType<Customer> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Edad", dataIndex: "age", key: "age" },
    { title: "País", dataIndex: ["country", "name"], key: "country" },
  ];

  const pagination: TablePaginationConfig = {
    current: metadata?.current_page,
    pageSize: metadata?.per_page,
    total: metadata?.total,
    showSizeChanger: true,
    onChange: (page, pageSize) => {
      onChangePage(page, pageSize);
    },
    pageSizeOptions: ["10", "20", "50"],
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={pagination}
    />
  );
}
