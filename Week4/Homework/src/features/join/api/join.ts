import { axiosApi } from "@/shared/api";
import type { User } from "@/entities/user/model/user";

interface Request {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export const join = async (data: Request) => {
  const res: User = await axiosApi.post("/api/v1/users", data);
  if (res.name) {
    alert(`${res.name}님, 가입이 완료되었어요!`);
  }

  return res;
};
