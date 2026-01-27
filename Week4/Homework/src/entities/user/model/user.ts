export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
  status: "ACTIVE" | "INACTIVE";
}
