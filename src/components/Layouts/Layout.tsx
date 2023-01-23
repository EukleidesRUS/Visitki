import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "../App/App.module.css";
import { Outlet } from "react-router-dom";
import { FC } from "react";

const Layout:FC = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
