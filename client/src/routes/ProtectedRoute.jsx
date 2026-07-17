import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Loader from "../Components/ui/WaitingLoader";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useCurrentUser();
  if (isLoading){
    return <Loader />;
  }

  console.log(data)
  if (isError || !data){
    return <Navigate to="/auth" replace />
  }

  return <Outlet />;
};

export default ProtectedRoute;
