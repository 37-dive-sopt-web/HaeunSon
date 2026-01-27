import axios from "axios";
import { axiosApi } from "@/shared/api";

interface Request {
  username: string;
  password: string;
}

interface Response {
  userId: number;
  message: string;
}

const HANDLED_ERROR_CODES = [400, 401, 403, 404];

export const login = async (data: Request) => {
  try {
    const res: Response = await axiosApi.post("/api/v1/auth/login", data);
    if (res.userId) {
      localStorage.setItem("userId", res.userId.toString());
    }

    return res;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (HANDLED_ERROR_CODES.includes(error.response.status)) {
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
    throw error;
  }
};
