import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Slidebar from "./components/slidebar/slidebar";

const AppLayout = () => {
  return (
    <>
      <>
        <div className="h-screen flex">
          <Slidebar />
          <div className="flex-1">
            <Navbar />
            <main className="p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </>
    </>
  );
};

export default AppLayout;
