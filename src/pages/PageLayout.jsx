import { Outlet } from "react-router-dom";

import { SideNav  } from "@common/SideNav";
import { AppContextProvider } from "@root/app-context";

import styles from "./PageLayout.module.css";

export function PageLayout() {
  return (
    <AppContextProvider>
      <div className={styles.layout}>
        <SideNav />
        <div className={styles["content-wrapper"]}>
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}
