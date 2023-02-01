import { FC, useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import { TContext } from "../../utils/types";
import AccountBox from "../AccountBox/AccountBox";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

const Header: FC = (): JSX.Element => {
  const { state } = useContext<TContext>(AuthContext);
  
  return (
    <header className={styles.header}>
      <Logo />
      {state.isAuth && <AccountBox />}
    </header>
  );
};

export default Header;
