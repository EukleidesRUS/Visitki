import { FC, useEffect, useState } from "react";
import thumbsUpIcon from "../../icons/reactions/like.svg";
import thumbsDownIcon from "../../icons/reactions/dislike.svg";
import waveIcon from "../../icons/reactions/wave.svg";
import rollingFunnyIcon from "../../icons/reactions/rollingFunny.svg";
import loveEysIcon from "../../icons/reactions/loveEys.svg";
import sadIcon from "../../icons/reactions/sad.svg";
import dissatisfiedIcon from "../../icons/reactions/dissatisfield.svg";
import fearIcon from "../../icons/reactions/fear.svg";
import smiledIcon from "../../icons/reactions/smile.svg";
import heartIcon from "../../icons/reactions/heart.svg";
import styles from "./FeedbackBlock.module.css";

export let defaultReactionsArray = [
  { id: 1, item: thumbsUpIcon, count: 0 }, //like
  { id: 2, item: thumbsDownIcon, count: 0 },
  { id: 3, item: waveIcon, count: 0 },
  { id: 4, item: smiledIcon, count: 0 }, //smile
  { id: 5, item: sadIcon, count: 0 },
  { id: 6, item: rollingFunnyIcon, count: 0 },
  { id: 7, item: dissatisfiedIcon, count: 0 },
  { id: 8, item: fearIcon, count: 0 },
  { id: 9, item: loveEysIcon, count: 0 },
  { id: 10, item: heartIcon, count: 0 }, //heart
];

type TFeedbackBlock = {
  open: boolean;
  //Дописать тип для реакций
  profileData: any;
  target: string;
  size?: string;
  location: string;
};

const FeedbackBlock: FC<TFeedbackBlock> = ({
  open,
  profileData,
  target,
  size,
  location,
}): JSX.Element => {
  const [feedbackVisibility, setFeedbackVisibility] = useState(false);
  const [feedbackSize, setFeedbackSize] = useState<any>("");

  const [reactions, setReactions] = useState<any>({
    commentsData: null,
    emotionsData: null,
  });

  useEffect(() => {
    setFeedbackSize(size);
  }, [size]);

  //Преобразую массив со смайликами
  const transforvOgjArr = (defObj: any, newObj: any) => {
    const resultEmotionsArr = defObj.map((x: any) => {
      const emotion: any = newObj.find(
        ({ item, count }: any) => item === x.item && count !== x.count
      );
      return emotion ? emotion : x;
    });
    return resultEmotionsArr;
  };

  //Функция, перобразующая полученные эмоции в объект по типу defaultReactionsArray
  //Нужна только на текущий момент, т.к. с сервера неизвестно в каком виде будут приходить emotions
  //Сейчас приходят строкой и есть названия только 3 эмоций.
  const transformOgjEmotions = (emotionsArr: Array<any>) => {
    let newEmotionsArr = [];
    for (let index = 0; index < emotionsArr.length; index++) {
      const element = emotionsArr[index];
      switch (element.emotion) {
        case "like":
          newEmotionsArr.push({ id: 1, item: thumbsUpIcon, count: 1 });
          break;
        case "smile":
          newEmotionsArr.push({ id: 4, item: smiledIcon, count: 1 });
          break;
        case "heart":
          newEmotionsArr.push({ id: 10, item: heartIcon, count: 1 });
          break;
        default:
          break;
      }
    }
    return transforvOgjArr(defaultReactionsArray, newEmotionsArr);
  };

  //Фильтруем комментарии по таргеты
  const filterComments = (commentsArr: any) => {
    const filtredCommentsArr = [];
    for (let index = 0; index < commentsArr.length; index++) {
      const comment = commentsArr[index];
      if (comment.target === target) filtredCommentsArr.push(comment);
      if (!comment.target) filtredCommentsArr.push(comment);
    }
    return filtredCommentsArr;
  };

  //Фильтрую реакции на комментарий и эмоции
  const filterReactions = (reactions: any) => {
    let commentsArr = [];
    //На данный момент эмоции с бека криво приходят, т.к. у них не задан target
    //поэтому непонятно куда адресованы эмоции. Эмоции которые приходят сейчас,
    //для теста назначаем соответствующим карточкам пользователей на странице main
    let emotionsArr = [];

    for (let index = 0; index < reactions.length; index++) {
      const reaction = reactions[index];
      reaction.emotion
        ? emotionsArr.push(reaction)
        : commentsArr.push(reaction);
    }
    return { commentsArr, emotionsArr };
  };

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
        const commentsArr = filterComments(reactionsArr.commentsArr);
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
