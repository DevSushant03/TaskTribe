import { Outlet } from "react-router-dom";
const UserLayout = () => {
  return (
    <div>
      <nav>User Navigation</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
