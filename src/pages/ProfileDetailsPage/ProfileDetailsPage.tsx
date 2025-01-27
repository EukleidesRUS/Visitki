import { FC, useState, useEffect, useMemo, useContext } from "react";
import TelegramIcon from "../../components/Icons/TelegramIcon/TelegramIcon";
import GitHubIcon from "../../components/Icons/GitHubIcon/GitHubIcon";
import StatusIcon from "../../components/Icons/StatusIcon/StatusIcon";
import ChatIcon from "../../components/Icons/ChatIcon/ChatIcon";
import ProfileDetailsOtherBlock from "../../components/ProfileDetailsOtherBlock/ProfileDetailsOtherBlock";
import styles from "./ProfileDetailsPage.module.css";
import Preloader from "../../components/Preloader/Preloader";
import { getReactionsData, getUserProfile } from "../../utils/api/api";
import {
  TCardProfileData,
  TProfileDetailsID,
  TProfileID,
} from "../../utils/types";
import { useLocation } from "react-router";
import FeedbackBlock from "../../components/FeedbackBlock/FeedbackBlock";
import { AuthContext } from "../../services/AuthContext";

const ProfileDetailsPage: FC<TProfileDetailsID> = (): JSX.Element => {
  const { state } = useContext(AuthContext);
  const location = useLocation();
  const [profileData, setprofileData] = useState<TCardProfileData>({
    data: null,
    reactions: null,
  });

  //С сервера не приходят данные о теме.
  //Варианты для тестирования "default", "daring", "romantic".
  const [theme, setTheme] = useState({
    profilePhotoStyle: "default",
    borderAndColor: "default",
  });

  const [isOpen, setIsOpen] = useState({
    status: false,
    photo: false,
  });

  //Функция открытия/закрытия окна фидбека
  const openFeedback = (item: string) => {
    item === "status"
      ? !isOpen.status
        ? setIsOpen({ ...isOpen, status: true })
        : setIsOpen({ ...isOpen, status: false })
      : !isOpen.photo
      ? setIsOpen({ ...isOpen, photo: true })
      : setIsOpen({ ...isOpen, photo: false });
  };

  //Получение ID пользователя
  const id = useMemo(() => {
    return location.pathname.split(":")[1] || null;
  }, [location.pathname]);

  //Отрисовка данных профиля студента
  useEffect(() => {
    if (id) {
      getUserProfile(id)
        .then((resData: TProfileID) => {
          getReactionsData(id)
            .then((resReactions) => {
              setprofileData({
                ...profileData,
                data: resData,
                reactions: resReactions,
              });
            })
            .catch((err) =>
              console.log(
                `При отправке запроса реакций пользователя произошла ${err}`
              )
            );
        })
        .catch((err) =>
          console.log(
            `При отправке запроса данных пользователя произошла ${err}`
          )
        );
    }
  }, [id]);

  useEffect(() => {
    if (state.theme === "романтичный") {
      setTheme({
        ...theme,
        profilePhotoStyle: "romantic",
        borderAndColor: "romantic",
      });
    } else if (state.theme === "дерзкий") {
      setTheme({
        ...theme,
        profilePhotoStyle: "daring",
        borderAndColor: "daring",
      });
    }
  }, [state.theme]);

  return (
    <div className={styles.profileDetailsContainer}>
      {/* на данный момент, в рамках возможностей бекенда, реализовали возможность 
     переключения профиля темы пользователей в данной форме. 
     После реализации, со стороны бекенда, возможности изменять данные пользователя
     необходимо убрать условие  !state.profileData*/}
      {!profileData.data && !state.userData ? (
        <Preloader />
      ) : (
        profileData.data && state.userData && (
          <>
            <div className={styles.profileDetailsMain}>
              <div className={styles.profileDetailsMainInfo}>
                <h1 className={styles.profileDetailsMainInfoName}>
                  {profileData.data.profile.name}
                </h1>
                <p className={styles.profileDetailsMainInfoTown}>
                  {profileData.data.profile.city.name}
                </p>
                <div className={styles.profileDetailsMainInfoIcons}>
                  <a
                    className={styles.link}
                    href={`https://t.me/s/${profileData.data.profile.telegram}`}
                  >
                    <TelegramIcon />
                  </a>
                  <a
                    className={styles.link}
                    href={`https://github.com/${profileData.data.profile.github}`}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
              <div className={styles.profileDetailsMainInfoImgContainer}>
                <FeedbackBlock
                  open={isOpen.photo}
                  profileData={profileData}
                  target="photo"
                  size="forDetails"
                />
                <img
                  className={`${styles.profileDetailsMainInfoImg} 
              ${
                (theme.profilePhotoStyle === "romantic" &&
                  styles.profileDetailsMainInfoImgRomantic) ||
                (theme.profilePhotoStyle === "daring" &&
                  styles.profileDetailsMainInfoImgDaring)
              }`}
                  src={profileData.data.profile.photo}
                  alt="ProfilePhoto"
                />
                <div
                  className={styles.profileDetailsMainInfoChatIcon}
                  onClick={() => openFeedback("photo")}
                >
                  <ChatIcon count={2} />
                </div>
              </div>
              <div className={styles.profileDetailsMainInfoStatus}>
                <div className={styles.profileDetailsMainInfoStatusFeedback}>
                  <FeedbackBlock
                    open={isOpen.status}
                    profileData={profileData}
                    target="quote"
                    size="forCards"
                  />
                </div>
                <div
                  className={styles.profileDetailsMainInfoStatusIconContainer}
                >
                  {/* Цвет в зависимости от темы передаем в stroke:#100C34 или #FF00A8  */}
                  <StatusIcon
                    stroke={
                      theme.borderAndColor !== "default" ? "#FF00A8" : "#100C34"
                    }
                  />
                </div>
                <h3
                  className={`${styles.profileDetailsMainInfoStatusText} ${
                    theme.borderAndColor !== "default" &&
                    styles.profileDetailsMainInfoColor
                  }`}
                >
                  {/* В дополнение к комментарию на строке 85, здесь необходимо будет
                подставлять данные конкретного пользователя */}
                  {state.userData.profile.quote}
                </h3>
                <div
                  className={styles.profileDetailsMainInfoStatusIcon}
                  onClick={() => openFeedback("status")}
                >
                  <ChatIcon count={profileData.data.info.status.reactions} />
                </div>
              </div>
            </div>

            <div className={styles.profileDetailsOther}>
              {profileData.data.info.hobby && (
                <ProfileDetailsOtherBlock
                  theme={theme.borderAndColor !== "default" ? true : false}
                  title="УВЛЕЧЕНИЯ"
                  target="hobby"
                  image={profileData.data.info.hobby.image}
                  description={profileData.data.info.hobby.text}
                  profileData={profileData}
                  count={profileData.data.info.hobby.reactions}
                />
              )}
              {profileData.data.info.status && (
                <ProfileDetailsOtherBlock
                  theme={theme.borderAndColor !== "default" ? true : false}
                  title="СЕМЬЯ"
                  target="status"
                  image={profileData.data.info.status.image}
                  description={profileData.data.info.status.text}
                  profileData={profileData}
                  count={profileData.data.info.status.reactions}
                />
              )}
              {profileData.data.info.job && (
                <ProfileDetailsOtherBlock
                  theme={theme.borderAndColor !== "default" ? true : false}
                  title="СФЕРА"
                  target="job"
                  description={profileData.data.info.job.text}
                  profileData={profileData}
                  count={profileData.data.info.job.reactions}
                />
              )}
              {profileData.data.info.edu && (
                <ProfileDetailsOtherBlock
                  theme={theme.borderAndColor !== "default" ? true : false}
                  title="УЧЕБА"
                  target="edu"
                  description={profileData.data.info.edu.text}
                  profileData={profileData}
                  count={profileData.data.info.edu.reactions}
                />
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ProfileDetailsPage;
