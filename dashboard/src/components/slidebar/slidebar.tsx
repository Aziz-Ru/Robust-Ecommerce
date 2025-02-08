import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllTable } from "../api/api";
import { Table } from "../utils/types";

const Slidebar = () => {
  const { data, error } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: getAllTable,
  });
  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="w-40 h-screen bg-gray-200 md:block hidden">
        <h1 className="text-2xl py-2 px-4 mb-4">Dashboard</h1>
        {data?.map((table: Table, index: number) => (
          <ul key={index} className="flex items-center gap-2 p-2 px-4">
            <li>
              <Link to={`/${table.table_name}`}>{table.table_name}</Link>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Slidebar;
