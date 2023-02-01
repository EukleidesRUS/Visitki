import { FC, useEffect, useState } from "react";
import styles from "./FeedbackBlock.module.css";
import {
  TEmotion,
  TFeedbackBlock,
  TProfileReactions,
  TReactionsState,
} from "../../utils/types";
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
  const [feedbackSize, setFeedbackSize] = useState<string | undefined>("");
  const [reactions, setReactions] = useState<TReactionsState>({
    commentsData: null,
    emotionsData: null,
  });

  //Изменение стейта
  const setReactionsState = (
    commentsArr: TProfileReactions[],
    emotionsArr: TEmotion[]
  ) => {
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
    if (profileData.reactions && profileData.reactions.items) {
      const reactionsArr = profileData.reactions.items;
      const reactionsObj: {
        commentsArr: Array<TProfileReactions>;
        emotionsArr: Array<TProfileReactions>;
      } = filterReactions(reactionsArr);
      if (reactionsObj.commentsArr) {
        const commentsArr = filterComments(reactionsObj.commentsArr, target);
        if (reactionsObj.emotionsArr && reactionsObj.emotionsArr.length > 0) {
          const transformedEmotions = transformOgjEmotions(
            reactionsObj.emotionsArr
          );
          setReactionsState(commentsArr, transformedEmotions);
        }
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
      {reactions?.commentsData && reactions.commentsData.length > 0 && (
        <p className={styles.feedbackText}>
          {reactions.commentsData.map((reaction) => reaction.text)}
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
        {reactions &&
          reactions.emotionsData &&
          reactions.emotionsData.map((reaction: TEmotion, index: number) => (
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
        {reactions &&
          !reactions.emotionsData &&
          defaultReactionsArray.map((reaction, index) => (
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
