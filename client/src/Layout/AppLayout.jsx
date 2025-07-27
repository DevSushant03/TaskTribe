import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div>
      <header>Public Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
