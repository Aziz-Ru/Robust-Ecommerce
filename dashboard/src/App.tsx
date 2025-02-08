import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Table from "./components/ui/Table";


function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<div>Home</div>} />
        <Route path=":table" element={<Table />} />
      </Route>
    </Routes>
  );
}

export default App;

{
  /* <div>
        <button onClick={() => setOpen(!open)}>On</button>
        <div
          className={`w-60 h-10 bg-green-500 mt-5 duration-1000 ease-in ${
            open ? "translate-x-60 " : "translate-x-0"
          }`}
        ></div>
        <div className="w-60 h-10 bg-yellow-500"></div>
        <div className="w-60 h-10 bg-red-500"></div>
        <div className="w-60 h-10 bg-pink-500"></div>
      </div> */
}
