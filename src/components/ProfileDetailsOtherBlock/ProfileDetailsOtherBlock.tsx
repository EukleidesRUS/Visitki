import React, { FC, useState } from "react";
import imgBorderSolid from "../../images/BorderSolid.png";
import imgBorderZig from "../../images/BorderZig.png";
import { TProfileID } from "../../utils/types";
import FeedbackBlock from "../FeedbackBlock/FeedbackBlock";
import ChatIcon from "../Icons/ChatIcon/ChatIcon";
import styles from "./ProfileDetailsOtherBlock.module.css";

type TProfileDetailsOtherBlock = {
  theme: boolean;
  title: string;
  target: string;
  image?: string;
  description?: string;
  profileData?:TProfileID | null;
};

const ProfileDetailsOtherBlock: FC<TProfileDetailsOtherBlock> = ({
  theme,
  title,
  image,
  description,
  profileData,
  target
}): JSX.Element => {

  const [isImg, setIsImg] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openFeedback = () => {
    setIsOpen(!isOpen)
  };

  React.useEffect(() => {
    if (image) {
      setIsImg(true);
    }
  }, [image]);

  return (
    <div className={styles.profileDetailsOtherBlock}>
      <img
        className={styles.profileDetailsOtherBlockBorder}
        src={theme ? imgBorderZig : imgBorderSolid}
        alt="рамка"
      />
      <h4 className={styles.profileDetailsOtherBlockTitle}>{title}</h4>
      {isImg && (
        <img
          className={styles.profileDetailsOtherBlockImg}
          src={image}
          alt="фото"
        />
      )}
      <p className={styles.profileDetailsOtherBlockDescription}>
        {description}
      </p>
      <div className={styles.profileDetailsOtherBlockChatIcon} onClick={openFeedback}>
        <ChatIcon count={1} />
      </div>
      <FeedbackBlock
        profileData={profileData}
        target={target}
        open={isOpen}
        size="forDetails"
      />
    </div>
  );
};

export default ProfileDetailsOtherBlock;
