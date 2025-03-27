import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";

const AppLayout = () => {
  return (
    <>
      <div className="h-screen flex">
        <div className="flex-1">
          <Navbar />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
