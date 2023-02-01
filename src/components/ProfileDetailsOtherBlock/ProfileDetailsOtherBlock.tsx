import React, { FC, useState } from "react";
import imgBorderSolid from "../../images/BorderSolid.png";
import imgBorderZig from "../../images/BorderZig.png";
import { TProfileDetailsOtherBlock } from "../../utils/types";
import FeedbackBlock from "../FeedbackBlock/FeedbackBlock";
import ChatIcon from "../Icons/ChatIcon/ChatIcon";
import styles from "./ProfileDetailsOtherBlock.module.css";

const ProfileDetailsOtherBlock: FC<TProfileDetailsOtherBlock> = ({
  theme,
  title,
  image,
  description,
  profileData,
  target,
  count
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
        <ChatIcon count={count} />
      </div>
      {profileData.data && <FeedbackBlock
        profileData={profileData}
        target={target}
        open={isOpen}
        size="forDetails"
      />}
    </div>
  );
};

export default ProfileDetailsOtherBlock;
