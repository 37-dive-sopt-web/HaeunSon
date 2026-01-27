import { axiosApi } from "@/shared/api";

export const deleteUser = async () => {
  const id = localStorage.getItem("userId");
  const res = await axiosApi.delete(`/api/v1/users/${id}`);
  return res;
};
