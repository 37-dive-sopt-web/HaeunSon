import { axiosApi } from "@/shared/api";

interface Request {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

interface Response {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
  status: "ACTIVE" | "INACTIVE";
}

export const join = async (data: Request) => {
  const res: Response = await axiosApi.post("/api/v1/users", data);
  if (res.name) {
    alert(`${res.name}님, 가입이 완료되었어요!`);
  }

  return res;
};
