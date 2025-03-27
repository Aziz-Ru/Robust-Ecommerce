import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>

        <Route index element={<div>Home</div>} />
        
      </Route>
    </Routes>
  );
}

export default App;


