import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatIcon from "../../components/Icons/ChatIcon/ChatIcon";
import { getReactionsData, getUserProfile } from "../../utils/api/api";
import { TCardProps, TProfileID } from "../../utils/types";
import FeedbackBlock from "../FeedbackBlock/FeedbackBlock";
import styles from "./Card.module.css";

const Card: FC<TCardProps> = ({
  img,
  name,
  city,
  id,
  location,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setprofileData] = useState<any | null>({
    data: null,
    reactions: null,
  });

  const openFeedback = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (id) {
      getUserProfile(id).then((resData: TProfileID) => {
        getReactionsData(id).then((resReactions) => {
          setprofileData({ ...profileData, data: resData, reactions: resReactions });
        });
      });
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardImgContainer}>
        <Link style={{ display: "flex" }} to={`details/:${id}`}>
          <img className={styles.cardImg} src={img} alt="ProfilePhoto" />
        </Link>
        <FeedbackBlock
          open={isOpen}
          profileData={profileData}
          target="hobby"
          location={location.pathname}
        />
      </div>
      <Link to={`details/:${id}`}>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardPlace}>{city}</p>
      </Link>

      <div className={styles.cardIcon} onClick={openFeedback}>
        <ChatIcon
          count={profileData.reactions ? profileData.reactions.total : `${0}`}
        />
      </div>
    </div>
  );
};

export default Card;
