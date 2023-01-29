import { FC, useContext } from "react";
import ProtectedLink from "../../HOC/ProtectedLink";
import { AuthContext } from "../../services/AuthContext";
import styles from "./AccountBox.module.css";

const AccountBox: FC = (): JSX.Element => {
  const { state, setState } = useContext(AuthContext);

  const isAdmin = () => {
    if (state.isAdmin) {
      setState({ ...state, isAdmin: false });
    } else {
      setState({ ...state, isAdmin: true });
    }
  };
  return (
    <div className={styles.accountBox}>
           <ProtectedLink
          className={styles.protectedLink}
          to={state.isAdmin ? "/admin" : `/details/:${state.id}`}
        >
      <div className={styles.accountBoxContainer}>
        {!state.isAdmin && state.userData ? (
          <img
            className={styles.profilePhoto}
            src={state.userData.profile.photo}
            alt="Фото профиля"
          />
        ) : (
          <div className={styles.profilePhotoAdmin} />
        )}
        <p className={styles.profileName}>
          {!state.isAdmin && state.userData
            ? state.userData.profile.name
            : "Панель администратора"}
        </p>
      </div>
      </ProtectedLink>
      <div className={styles.accountBoxButtons}>
        <ProtectedLink
          className={styles.protectedLink}
          to={state.isAdmin ? "/admin" : `/profile`}
        >
          {!state.isAdmin && (
            <div className={styles.accountBoxButton}>
              <p className={styles.accountBoxButtonProfile}>Профиль</p>
            </div>
          )}
        </ProtectedLink>
        <ProtectedLink className={styles.protectedLink} to={"admin"}>
          <div className={styles.accountBoxButton} onClick={isAdmin}>
            <p className={styles.accountBoxButtonProfile}>
              {!state.isAdmin ? "Админ" : "Пользовательский"}
            </p>
          </div>
        </ProtectedLink>
      </div>
    </div>
  );
};

export default AccountBox;
