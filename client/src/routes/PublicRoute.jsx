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

  console.log(data)
  if (data) {
    return (
      <Navigate
        to={`/user/${data?._id}/dashboard`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;