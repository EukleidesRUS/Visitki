import { defaultReactionsArray } from "./emjiData";
import thumbsUpIcon from "../icons/reactions/like.svg";
import smiledIcon from "../icons/reactions/smile.svg";
import heartIcon from "../icons/reactions/heart.svg";
import { TEmotion, TProfileReactions } from "./types";

//Преобразую массив со смайликами
const transforvOgjArr = (defObj: TEmotion[], newObj: TEmotion[]) => {
  const resultEmotionsArr = defObj.map((x) => {
    const emotion = newObj.find(
      ({ item, count }) => item === x.item && count !== x.count
    );
    return emotion ? emotion : x;
  });
  return resultEmotionsArr;
};

//Функция фильтрации реакции на комментарий и эмоции
export const filterReactions = (reactions: TProfileReactions[]) => {
  let commentsArr = [];
  //На данный момент эмоции с бека криво приходят, т.к. у них не задан target
  //поэтому непонятно куда адресованы эмоции. Эмоции которые приходят сейчас,
  //для теста назначаем соответствующим карточкам пользователей на странице main
  let emotionsArr = [];

  for (let index = 0; index < reactions.length; index++) {
    const reaction = reactions[index];
    reaction.emotion ? emotionsArr.push(reaction) : commentsArr.push(reaction);
  }
  return { commentsArr, emotionsArr };
};

//Фильтруем комментарии по таргетам
export const filterComments = (
  commentsArr: TProfileReactions[],
  target: string
) => {
  const filtredCommentsArr = [];
  for (let index = 0; index < commentsArr.length; index++) {
    const comment = commentsArr[index];
    if (comment.target === target) filtredCommentsArr.push(comment);
    //Костыль, т.к. в бекенда комментарий для фото приходит с пустым target
    //После починки бекенда, строку ниже - убрать
    if (!comment.target) filtredCommentsArr.push(comment);
  }
  return filtredCommentsArr;
};

//Функция, перобразующая полученные эмоции в объект по типу defaultReactionsArray
//Нужна только на текущий момент, т.к. с сервера неизвестно в каком виде будут приходить emotions
//Сейчас приходят строкой и есть названия только 3 эмоций.
export const transformOgjEmotions = (emotionsArr: TProfileReactions[]) => {
  let newEmotionsArr = [];
  if (
    !emotionsArr.find((item: TProfileReactions) => item.from === undefined) &&
    emotionsArr.length > 0
  ) {
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
  }
  return transforvOgjArr(defaultReactionsArray, newEmotionsArr);
};
