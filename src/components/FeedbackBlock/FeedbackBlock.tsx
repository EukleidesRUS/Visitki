import { FC, useEffect, useState } from "react";import styles from "./FeedbackBlock.module.css";
import { TFeedbackBlock } from "../../utils/types";
import { defaultReactionsArray } from "../../utils/emjiData";
import {
  filterComments,
  filterReactions,
  transformOgjEmotions,
} from "../../utils/feedBackFilter";

const FeedbackBlock: FC<TFeedbackBlock> = ({
  open,
  profileData,
  target,
  size,
}): JSX.Element => {
  const [feedbackVisibility, setFeedbackVisibility] = useState(false);
  const [feedbackSize, setFeedbackSize] = useState<any>("");
  const [reactions, setReactions] = useState<any>({
    commentsData: null,
    emotionsData: null,
  });

  //Изменение стейта
  const setReactionsState = (commentsArr: any, emotionsArr: any) => {
    commentsArr.length > 0 && emotionsArr.length > 0
      ? setReactions({
          commentsData: commentsArr,
          emotionsData: emotionsArr,
        })
      : commentsArr.length > 0
      ? setReactions({
          commentsData: commentsArr,
          emotionsData: defaultReactionsArray,
        })
      : emotionsArr.length > 0
      ? setReactions({
          commentsData: commentsArr,
          emotionsData: emotionsArr,
        })
      : setReactions({
          commentsData: null,
          emotionsData: defaultReactionsArray,
        });
  };

  useEffect(() => {
    let reactionsArr = null;
    if (profileData.reactions) {
      reactionsArr = profileData.reactions.items;
      reactionsArr = filterReactions(reactionsArr);
      if (reactionsArr.commentsArr) {
        const commentsArr = filterComments(reactionsArr.commentsArr, target);
        if (reactionsArr.emotionsArr.length > 0) {
          const transformedEmotions = transformOgjEmotions(
            reactionsArr.emotionsArr
          );
          reactionsArr.emotionsArr = transformedEmotions;
        }
        setReactionsState(commentsArr, reactionsArr.emotionsArr);
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setFeedbackVisibility(true);
    } else {
      setFeedbackVisibility(false);
    }
  }, [open]);

  useEffect(() => {
    setFeedbackSize(size);
  }, [size]);

  return (
    <div
      className={`${styles.feedback} ${
        feedbackVisibility && styles.feedbackVisibility
      }
        ${feedbackSize === "forDetails" && styles.feedbackForDetailsOther}`}
    >
      {reactions.commentsData && (
        <p className={styles.feedbackText}>
          {reactions.commentsData.map((reaction: any) => reaction.text)}
        </p>
      )}
      <textarea
        className={`${styles.feedbackTextArea} ${
          feedbackSize === "forDetails" &&
          styles.feedbackTextAreaForDetailsOther
        }`}
        placeholder="Обратная связь"
      ></textarea>
      <div
        className={`${styles.feedbackReactions} ${
          feedbackSize === "forDetails" &&
          styles.feedbackReactionsForDetailsOther
        }`}
      >
        {reactions.emotionsData &&
          reactions.emotionsData.map((reaction: any, index: number) => (
            <div
              key={index}
              className={`${styles.feedbackReaction} ${
                feedbackSize === "forDetails" &&
                styles.feedbackReactionForDetailsOther
              }`}
            >
              <img
                className={styles.feedbackReactionImg}
                src={reaction.item}
                alt="emoji"
              />
              {reaction.count > 0 && (
                <p className={styles.feedbackReactionCount}>{reaction.count}</p>
              )}
            </div>
          ))}
        {!reactions.emotionsData &&
          defaultReactionsArray.map((reaction: any, index: number) => (
            <div
              key={index}
              className={`${styles.feedbackReaction} ${
                feedbackSize === "forDetails" &&
                styles.feedbackReactionForDetailsOther
              }`}
            >
              <img
                className={styles.feedbackReactionImg}
                src={reaction.item}
                alt="emoji"
              />
              {reaction.count > 0 && (
                <p className={styles.feedbackReactionCount}>{reaction.count}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackBlock;
