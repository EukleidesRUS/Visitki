import { FC, useEffect, useState, useContext, ChangeEvent } from "react";
import SelectRegionInput from "../../components/ProfileInputs/SelectRegionInput/SelectRegionInput";
import styles from "./ProfilePage.module.css";
import { ReactComponent as Clip } from "../../images/logo/clip.svg";
import { CalendarInput } from "../../components/ProfileInputs/Calendar/CalendarInput";
import { TProfileStateForm } from "../../utils/types";
import SelectStyleInput from "../../components/ProfileInputs/SelectStyleInput/SelectStyleInput";
import { AuthContext } from "../../services/AuthContext";
import { TContext } from "../../utils/types";
import { profileDefaultState } from "../../utils/profileDefaultState";
import AvatarForm from "../../components/ProfileInputs/AvatarForm/AvatarForm";
import Button from "../../components/Button/Button";

const ProfilePage: FC = () => {
  const { state } = useContext<TContext>(AuthContext);

  //Стейт для отправки данных формы
  const [form, setFormValue] = useState(profileDefaultState);
  useEffect(() => {
    if (state.userData) {
      const { profile, info } = state.userData;
      setFormValue({
        profile: {
          name: profile.name,
          photo: profile.photo,
          city: {
            name: profile.city.name,
            geocode: profile.city.geocode,
          },
          birthday: profile.birthday,
          quote: profile.quote,
          telegram: profile.telegram,
          github: profile.github,
          template: state.userData.profile.template,
        },
        info: {
          hobby: {
            text: info.hobby.text,
            image: info.hobby.image,
          },
          status: {
            text: info.status.text,
            image: info.status.image,
          },
          job: {
            text: info.job.text,
          },
          edu: {
            text: info.edu.text,
          },
        },
      });
    }
  }, [state.userData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | TProfileStateForm
  ) => {
    event.preventDefault();
  };

  return !!state.userData ? (
    <section className={styles.main}>
      <AvatarForm state={state} setFormValue={setFormValue} />

      <form className={styles.form} action="" onSubmit={handleChange}>
        <div className={styles.input__container}>
          <p className={styles.input__title}> Дата рождения *</p>
          {state.userData && (
            <CalendarInput birthday={state.userData.profile.birthday} />
          )}
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Выберите город *</p>
          <div className={styles.select__container}>
            <SelectRegionInput />
          </div>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Ник в телеграм</p>
          <label className={styles.input__label} htmlFor="">
            <input
              className={styles.input}
              placeholder="@example"
              type="text"
              value={state.userData.profile.telegram}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Ник на гитхабе</p>
          <label className={styles.input__label}>
            <input
              className={styles.input}
              placeholder="@example"
              type="text"
              defaultValue={state.userData.profile.github}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Выберите шаблон *</p>
          <SelectStyleInput />
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Девиз, цитата</p>
          <textarea
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Не более 100 символов"
            maxLength={100}
            value={state.userData.profile.quote}
          ></textarea>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Увлечения, досуг, интересы</p>
          <label
            className={`${styles.input__label} ${styles.input__label_type_file}`}
          >
            <input
              className={styles.input}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleChange}
            />
            <Clip className={styles.input__icon} />
          </label>
          <p className={styles.input__caption}>
            Рекомендуемый размер фото 230х129
          </p>
          <textarea
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
            value={state.userData.info.hobby.text}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}>
            Семья, статус, домашние животные
          </p>
          <label
            className={`${styles.input__label} ${styles.input__label_type_file}`}
          >
            <input
              className={styles.input}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleChange}
            />
            <Clip className={styles.input__icon} />
          </label>
          <p className={styles.input__caption}>
            Рекомендуемый размер фото 230х129
          </p>
          <textarea
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
            defaultValue={state.userData.info.edu.text}
          ></textarea>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}>
            Из какой сферы пришёл? Кем работаешь?
          </p>
          <textarea
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
            defaultValue={state.userData.info.job.text}
          ></textarea>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}>
            Почему решил учиться на веб-разработчика?
          </p>

          <textarea
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
          ></textarea>
        </div>
        <p className={styles.warning}>
          Поля, отмеченные звездочкой, обязательны для&nbsp;заполнения
        </p>
        {/* <button className={styles.profile__button}>Сохранить</button> */}
        <Button text="Сохранить" size="largeButton" disabled={false} />
      </form>
    </section>
  ) : null;
};

export default ProfilePage;
