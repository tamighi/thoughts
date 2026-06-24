import AppBar from "@/components/AppBar";
import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div>
      <AppBar />
      <h1>Hello root</h1>
      <Outlet />
    </div>
  );
};

export default Root;
