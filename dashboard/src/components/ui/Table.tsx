import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTable } from "../api/api";

const Table = () => {
  const { table } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["table", table],
    queryFn: () => getTable(table!),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data?.map((col: any, index: number) => {
        return <div key={index}>{col.column_name}</div>;
      })}
    </div>
  );
};

export default Table;
