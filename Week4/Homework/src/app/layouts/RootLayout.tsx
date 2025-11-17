import { Outlet } from "react-router";
import { rootLayout } from "./RootLayout.css";

const RootLayout = () => {
  return (
    <div className={rootLayout}>
      <Outlet />
    </div>
  );
};

export default RootLayout;
