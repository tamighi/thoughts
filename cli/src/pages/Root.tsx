import AppBar from "@/components/AppBar";
import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
};

export default Root;
