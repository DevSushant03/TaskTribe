import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Loader from "../Components/ui/WaitingLoader";

const PublicRoute = () => {
  const {
    data,
    isLoading,
  } = useCurrentUser();

  if (isLoading) {
    return <Loader/>
  }

  if (data?.data.user) {
    return (
      <Navigate
        to={`/user/${data?.data.user._id}/dashboard`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;