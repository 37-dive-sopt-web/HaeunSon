import { axiosApi } from "@/shared/api";
import type { User } from "@/entities/user/model/user";

interface Request {
  name: string;
  email: string;
  age: number;
}

export const updateUser = async (data: Request) => {
  const id = localStorage.getItem("userId");
  const res: User = await axiosApi.patch(`/api/v1/users/${id}`, data);
  return res;
};
