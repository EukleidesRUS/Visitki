import { FC, useState, useEffect, useContext, useMemo } from "react";
import TelegramIcon from "../../components/Icons/TelegramIcon/TelegramIcon";
import GitHubIcon from "../../components/Icons/GitHubIcon/GitHubIcon";
import StatusIcon from "../../components/Icons/StatusIcon/StatusIcon";
import ChatIcon from "../../components/Icons/ChatIcon/ChatIcon";
import ProfileDetailsOtherBlock from "../../components/ProfileDetailsOtherBlock/ProfileDetailsOtherBlock";
import styles from "./ProfileDetailsPage.module.css";
import Preloader from "../../components/Preloader/Preloader";
import { getReactionsData, getUserProfile } from "../../utils/api/api";
import { TProfileDetailsID, TProfileID } from "../../utils/types";
import { useLocation, useParams } from "react-router";
import FeedbackBlock from "../../components/FeedbackBlock/FeedbackBlock";
import { AuthContext } from "../../services/AuthContext";

const ProfileDetailsPage: FC<TProfileDetailsID> = (): any => {
  const { state, setState } = useContext(AuthContext);
  const location = useLocation();
  const [userData, setUserData] = useState<any | null>({
    data: null,
    reactions: null,
  });
  //С сервера не приходят данные о теме.
  //Варианты для тестирования "default", "daring", "romantic".
  const [theme, setTheme] = useState({
    profilePhotoStyle: "daring",
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
  const { id } = useParams();

  useEffect(() => {
    //Для администратора
    if (id && state.isAdmin) {
      getUserProfile(id).then((resData: TProfileID) => {
        //Из другого места брать комменты для админа!!!!!
        getReactionsData(id).then((resReactions) => {
          setUserData({ ...userData, data: resData, reactions: resReactions });
        });
      });
      //если карточка пренадлежит не пользвоателю и не администратору
    } else if (id !== state.id) {
      setUserData({
        ...userData,
        data: state.userData,
      });
    } else if (id) {
      getUserProfile(id).then((resData: TProfileID) => {
        if (id) {
          getReactionsData(id).then((resReactions) => {
            setUserData({
              ...userData,
              data: resData,
              reactions: resReactions,
            });
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      getUserProfile(id).then((res: TProfileID) => setUserData(res));
    }
  }, []);
  console.log(userData);

  return (
    <div className={styles.profileDetailsContainer}>
      {!userData ? (
        <Preloader />
      ) : (
        <>
          <div className={styles.profileDetailsMain}>
            <div className={styles.profileDetailsMainInfo}>
              <h1 className={styles.profileDetailsMainInfoName}>
                {userData.data.profile.name}
              </h1>
              <p className={styles.profileDetailsMainInfoTown}>
                {userData.data.profile.city.name}
              </p>
              <div className={styles.profileDetailsMainInfoIcons}>
                <a
                  className={styles.link}
                  href={`https://t.me/s/${userData.data.profile.telegram}`}
                >
                  <TelegramIcon />
                </a>
                <a
                  className={styles.link}
                  href={`https://github.com/${userData.data.profile.github}`}
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
            <div className={styles.profileDetailsMainInfoImgContainer}>
              <FeedbackBlock
                open={isOpen.photo}
                userData={userData}
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
                src={userData.data.profile.photo}
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
              <FeedbackBlock
                open={isOpen.status}
                userData={userData}
                location={location.pathname}
              />
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
                Эй, приятель, я думаю, ты ошибся дверью, клуб любителей кожаных
                вещей двумя этажами ниже.
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
            {userData.data.info.hobby && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="УВЛЕЧЕНИЯ"
                image={userData.data.info.hobby.image}
                description={userData.data.info.hobby.text}
                userData={userData}
              />
            )}
            {userData.data.info.status && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="СЕМЬЯ"
                image={userData.data.info.status.image}
                description={userData.data.info.status.text}
                userData={userData}
              />
            )}
            {userData.data.info.job && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="СФЕРА"
                description={userData.data.info.job.text}
                userData={userData}
              />
            )}
            {userData.data.info.edu && (
              <ProfileDetailsOtherBlock
                theme={theme.borderDetailsOther !== "default" ? true : false}
                title="УЧЕБА"
                description={userData.data.info.edu.text}
                userData={userData}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetailsPage;
