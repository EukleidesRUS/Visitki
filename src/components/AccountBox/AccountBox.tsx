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
    //Тут будет не профиль
    <div className={styles.accountBox}>
      <div className={styles.accountBoxContainer}>
        {!state.isAdmin ? (
          <img
            className={styles.profilePhoto}
            src={state.userData.profile.photo}
            alt="Фото профиля"
          />
        ) : (
          <div className={styles.profilePhotoAdmin} />
        )}
        <p className={styles.profileName}>
          {!state.isAdmin
            ? state.userData.profile.name
            : "Панель администратора"}
        </p>
      </div>
      <div className={styles.accountBoxButtons}>
        <ProtectedLink
          className={styles.protectedLink}
          to={state.isAdmin ? "/admin" : `/details/:${state.id}`}
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
              Режим {!state.isAdmin ? "админа" : "пользователя"}
            </p>
          </div>
        </ProtectedLink>
      </div>
    </div>
  );
};

export default AccountBox;
