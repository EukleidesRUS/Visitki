import { useState, Dispatch, SetStateAction } from "react";
import Avatar from "react-avatar";
import styles from "../../../pages/ProfilePage/ProfilePage.module.css";
import { TAuth, TProfileStateForm } from "../../../utils/types";
import photo from "../../../images/Ellipse.png";

const AvatarForm = ({
  state
}: {
  state: TAuth;
}) => {
  const [file, setFile] = useState<any>();

  const handleChange = (e: any) => {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    state.userData && (
      <form className={styles.photo__container}>
        <h4 className={styles.photo__load}>Загрузите фото*</h4>
        <p className={styles.photo__size}>(размер не менее 440х440)</p>
        <label className={styles.avatar} htmlFor="file">
          <Avatar
            className={styles.cover}
            src={
              file == null && state.userData.profile !== null
                ? `${state.userData.profile.photo}`
                : file
            }
            color="white"
            round="100px"
            size="150px"
          ></Avatar>
          <img className={styles.photo__hover} src={photo} alt="avatar" />
        </label>
        <input
          className={styles.avatar}
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="avatar"
          id="file"
        />
      </form>
    )
  );
};

export default AvatarForm;
