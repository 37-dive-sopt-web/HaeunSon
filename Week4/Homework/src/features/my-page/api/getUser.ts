import { axiosApi } from "@/shared/api";
import type { User } from "@/entities/user/model/user";

export const getUser = async () => {
  const id = localStorage.getItem("userId");
  const res: User = await axiosApi.get(`/api/v1/users/${id}`);
  return res;
};
