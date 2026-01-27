import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HeaderLayout from "../layouts/HeaderLayout";

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
        path: "mypage",
        element: <HeaderLayout />,
        children: [
          {
            index: true,
            async lazy() {
              const { default: MyPage } = await import(
                "@pages/my-page/ui/MyPage"
              );
              return { Component: MyPage };
            },
          },
          {
            path: "members",
            async lazy() {
              const { default: MemberPage } = await import(
                "@pages/my-page/ui/MemberPage"
              );
              return { Component: MemberPage };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
