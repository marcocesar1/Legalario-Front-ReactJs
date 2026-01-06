import React from "react";
import useAuthStore from "../../auth/store/useAuthStore";
import { Button } from "antd";

export default function UserListPage() {
  const authStore = useAuthStore();

  return (
    <div>
      UserListPage
      <Button onClick={() => authStore.logout()}>Logout</Button>
    </div>
  );
}
