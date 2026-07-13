import AppBar from "@/components/layout/AppBar";
import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div>
      <AppBar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
