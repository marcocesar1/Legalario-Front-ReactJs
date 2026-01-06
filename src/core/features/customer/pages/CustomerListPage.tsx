import { useState } from "react";
import { Card, message } from "antd";

import { useCustomersQuery } from "../queries/useCustomersQuery";
import { useDebounce } from "../../../hooks/useDebounce";
import CustomerModal, { type CustomerValues } from "../modals/CustomerModal";
import { useCustomerMutation } from "../mutations/useCustomerMutation";
import Filters from "../components/Filters";
import CustomersTable from "../components/CustomersTable";

export default function CustomerList() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const query = useCustomersQuery({
    page,
    country,
    search: debouncedSearch,
    per_page: perPage,
  });

  const mutation = useCustomerMutation();

  const onSubmitCustomer = (values: CustomerValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        message.success("Registro creado exitosamente");
        setIsModalOpen(false);
      },
    });
  };

  return (
    <Card title="Usuarios">
      <Filters
        onChangeSearch={setSearch}
        onChangeCountry={setCountry}
        onCreateCustomer={setIsModalOpen}
      />

      <CustomersTable
        data={query.data?.data}
        metadata={query.data?.metadata}
        isLoading={query.isLoading}
        onChangePage={(page, perPage) => {
          setPage(page);
          setPerPage(perPage);
        }}
      />

      <CustomerModal
        error={mutation.error?.message}
        isOpen={isModalOpen}
        onSubmit={onSubmitCustomer}
        onCancel={() => setIsModalOpen(false)}
        isLoading={mutation.isPending}
      />
    </Card>
  );
}
