import { FC, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ChatIcon from "../../components/Icons/ChatIcon/ChatIcon";
import { AuthContext } from "../../services/AuthContext";
import { getReactionsData, getUserProfile } from "../../utils/api/api";
import { TCardProps, TProfileID } from "../../utils/types";
import FeedbackBlock from "../FeedbackBlock/FeedbackBlock";
import styles from "./Card.module.css";

const Card: FC<TCardProps> = ({ img, name, city, id }): JSX.Element => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  //Данные хозяина карточки
  const [userData, setUserData] = useState<any | null>({
    data: null,
    reactions: null,
  });
  //данные авторизованного пользователя
  const { state } = useContext(AuthContext);

  const openFeedback = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //Для администратора
    if (id && state.isAdmin) {
      console.log("admin");
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
    } else {
      //console.log("gost");
      getUserProfile(id).then((resData: TProfileID) => {
        getReactionsData(id).then((resReactions) => {
          setUserData({ ...userData, data: resData, reactions: resReactions });
        });
      });
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardImgContainer}>
        <Link style={{ display: 'flex' }} to={`details/:${id}`}>
          <img className={styles.cardImg} src={img} alt="ProfilePhoto" />
        </Link>
        <FeedbackBlock
          open={isOpen}
          userData={userData}
          location={location.pathname}
        />
      </div>
      <Link to={`details/:${id}`}>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardPlace}>{city}</p>
      </Link>

      <div className={styles.cardIcon} onClick={openFeedback}>
        <ChatIcon
          count={userData.reactions ? userData.reactions.total : `${0}`}
        />
      </div>
    </div>
  );
};

export default Card;
