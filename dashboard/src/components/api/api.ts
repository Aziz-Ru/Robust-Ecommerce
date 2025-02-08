import { baseApi } from "../utils/base-url";

export const getAllTable = async () => {
  const response = await baseApi.get("/admin/table");
  return response.data.tables;
};

export const getTable = async (table: string) => {
  const response = await baseApi.get(`/admin/table/${table}`);
  return response.data.columns;
};
