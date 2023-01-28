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

  // //Стейт для отправки данных формы
  // const [form, setForm] = useState({
  //   telegram: "",
  //   github: "",
  //   status: "",
  //   hobby: "",
  //   edu: "",
  //   job: "",
  //   family:"",
  // });

  //Стейт для отправки данных формы
  const [form, setForm] = useState(profileDefaultState);

  // useEffect(() => {
  //   if (state.userData) {
  //     setForm({
  //       ...form,
  //       telegram: state.userData.profile.telegram,
  //       github: state.userData.profile.github,
  //       status: state.userData.profile.quote,
  //       hobby: state.userData.info.hobby.text,
  //       edu: state.userData.info.edu.text,
  //       job: state.userData.info.job.text,
  //       family:state.userData.info.status.text
  //     });
  //   }
  // }, [state.userData])
console.log(state.userData);

  useEffect(() => {
    if (state.userData) {
      setForm({
        profile: {
          name: state.userData.profile.name,
          photo: state.userData.profile.photo,
          city: {
            name: state.userData.profile.city.name,
            geocode: state.userData.profile.city.geocode,
          },
          birthday: state.userData.profile.birthday,
          quote: state.userData.profile.quote,
          telegram: state.userData.profile.telegram,
          github: state.userData.profile.github,
          template: state.userData.profile.template,
        },
        info: {
          hobby: {
            text: state.userData.info.hobby.text,
            image: state.userData.info.hobby.image,
          },
          status: {
            text: state.userData.info.status.text,
            image: state.userData.info.status.image,
          },
          job: {
            text: state.userData.info.job.text,
            image: state.userData.info.job.image,
          },
          edu: {
            text: state.userData.info.edu.text,
            image: state.userData.info.edu.image,
          },
        },
      });
    }
  }, [state.userData]);

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | TProfileStateForm | any
  ) => {
    event.preventDefault();
    if (event.target.name === "telegram") {
      setForm({ ...form, profile: {...form.profile, telegram: event.target.value} });
    } else if (event.target.name === "github") {
      setForm({ ...form, profile: {...form.profile, github: event.target.value} });
    } else if (event.target.name === "status") {
      setForm({ ...form, info: {...form.info, status: {...form.info.status, text: event.target.value}} });
    } else if (event.target.name === "hobby") {
      setForm({ ...form, info: {...form.info, hobby: {...form.info.hobby, text: event.target.value}} });
    } else if (event.target.name === "edu") {
      setForm({ ...form, info: {...form.info, edu: {...form.info.edu, text: event.target.value}} });
    } else if (event.target.name === "job") {
      setForm({ ...form, info: {...form.info, job: {...form.info.job, text: event.target.value}} });
    } else if (event.target.name === "quote") {
      setForm({ ...form, profile: {...form.profile, quote: event.target.value} });
    }
  };
console.log(form);

  return !!state.userData ? (
    <section className={styles.main}>
      <AvatarForm state={state} />

      <form className={styles.form} action="" onSubmit={handleChangeInput}>
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
              type="text"
              value={form.profile.telegram}
              onChange={handleChangeInput}
              name="telegram"
            />
          </label>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}> Ник на гитхабе</p>
          <label className={styles.input__label}>
            <input
              className={styles.input}
              type="text"
              value={form.profile.github}
              onChange={handleChangeInput}
              name="github"
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
            onChange={handleChangeInput}
            className={styles.textarea}
            placeholder="Не более 100 символов"
            maxLength={100}
            value={form.profile.quote}
            name="quote"
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
              name="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleChangeInput}
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
            value={form.info.hobby.text}
            onChange={handleChangeInput}
            name="hobby"
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
              name="file"
              onChange={handleChangeInput}
            />
            <Clip className={styles.input__icon} />
          </label>
          <p className={styles.input__caption}>
            Рекомендуемый размер фото 230х129
          </p>
          <textarea
            onChange={handleChangeInput}
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
            value={form.info.status.text}
            name="status"
          ></textarea>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}>
            Из какой сферы пришёл? Кем работаешь?
          </p>
          <textarea
            onChange={handleChangeInput}
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
            value={form.info.job.text}
            name="job"
          ></textarea>
        </div>

        <div className={styles.input__container}>
          <p className={styles.input__title}>
            Почему решил учиться на веб-разработчика?
          </p>

          <textarea
            onChange={handleChangeInput}
            className={styles.textarea}
            placeholder="Не более 300 символов"
            maxLength={300}
            value={form.info.edu.text}
            name="edu"
          ></textarea>
        </div>
        <p className={styles.warning}>
          Поля, отмеченные звездочкой, обязательны для&nbsp;заполнения
        </p>
        <Button text="Сохранить" size="largeButton" disabled={false} />
      </form>
    </section>
  ) : null;
};


export default ProfilePage;
