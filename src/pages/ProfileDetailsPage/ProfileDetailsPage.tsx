import { FC, useState, useEffect, useMemo } from "react";
import TelegramIcon from "../../components/Icons/TelegramIcon/TelegramIcon";
import GitHubIcon from "../../components/Icons/GitHubIcon/GitHubIcon";
import StatusIcon from "../../components/Icons/StatusIcon/StatusIcon";
import ChatIcon from "../../components/Icons/ChatIcon/ChatIcon";
import ProfileDetailsOtherBlock from "../../components/ProfileDetailsOtherBlock/ProfileDetailsOtherBlock";
import styles from "./ProfileDetailsPage.module.css";
import Preloader from "../../components/Preloader/Preloader";
import { getReactionsData, getUserProfile } from "../../utils/api/api";
import { TProfileDetailsID, TProfileID } from "../../utils/types";
import { useLocation } from "react-router";
import FeedbackBlock from "../../components/FeedbackBlock/FeedbackBlock";

const ProfileDetailsPage: FC<TProfileDetailsID> = (): any => {
  const location = useLocation();
  const [profileData, setprofileData] = useState<any | null>({
    data: null,
    reactions: null,
  });
  //С сервера не приходят данные о теме.
  //Варианты для тестирования "default", "daring", "romantic".
  const [theme, setTheme] = useState({
    profilePhotoStyle: "default",
    statusColor: "default",
    borderDetailsOther: "default",
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
      getUserProfile(id).then((resData: TProfileID) => {
        getReactionsData(id).then((resReactions) => {
          setprofileData({
            ...profileData,
            data: resData,
            reactions: resReactions,
          });
        });
      });
    }
  }, [id]);

  return (
    <div className={styles.profileDetailsContainer}>
      {!profileData.data ? (
        <Preloader />
      ) : (
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
                location={location.pathname}
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
                  location={location.pathname}
                />
              </div>
              <div className={styles.profileDetailsMainInfoStatusIconContainer}>
                {/* Цвет в зависимости от темы передаем в stroke:#100C34 или #FF00A8  */}
                <StatusIcon
                  stroke={
                    theme.statusColor !== "default" ? "#FF00A8" : "#100C34"
                  }
                />
              </div>

              {/* Цитата с бека не комильфо, поэтому будет так */}
              <h3
                className={`${styles.profileDetailsMainInfoStatusText} ${
                  theme.statusColor !== "default" &&
                  styles.profileDetailsMainInfoColor
                }`}
              >
                Эй, приятель, я думаю, ты ошибся 
              </h3>
              <div
                className={styles.profileDetailsMainInfoStatusIcon}
                onClick={() => openFeedback("status")}
              >
                <ChatIcon count={1} />
              </div>
            </div>
          </div>

          <div className={styles.profileDetailsOther}>
            {profileData.data.info.hobby && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="УВЛЕЧЕНИЯ"
                target="hobby"
                image={profileData.data.info.hobby.image}
                description={profileData.data.info.hobby.text}
                profileData={profileData}
              />
            )}
            {profileData.data.info.status && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="СЕМЬЯ"
                target="status"
                image={profileData.data.info.status.image}
                description={profileData.data.info.status.text}
                profileData={profileData}
              />
            )}
            {profileData.data.info.job && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="СФЕРА"
                target="job"
                description={profileData.data.info.job.text}
                profileData={profileData}
              />
            )}
            {profileData.data.info.edu && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="УЧЕБА"
                target="edu"
                description={profileData.data.info.edu.text}
                profileData={profileData}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetailsPage;
