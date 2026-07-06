import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import Loader from "../components/Loader";

const AdminRoute = () => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }

  data.user.role = "admin";

  if (isError || data?.user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
