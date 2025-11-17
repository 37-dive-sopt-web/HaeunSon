import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        async lazy() {
          const { default: LoginPage } = await import(
            "@pages/login/ui/LoginPage"
          );
          return { Component: LoginPage };
        },
      },
      {
        path: "join",
        async lazy() {
          const { default: JoinPage } = await import("@pages/join/ui/JoinPage");
          return { Component: JoinPage };
        },
      },
      {
        path: "myPage",
        async lazy() {
          const { default: MyPage } = await import("@pages/my-page/ui/MyPage");
          return { Component: MyPage };
        },
      },
    ],
  },
]);

export default router;
