import { Dispatch, ReactNode, SetStateAction } from "react";

export type TFcVoid = () => void;

export type TLoaderProps = {
  width: string;
  height: string;
};

export type TProfileDetailsID = {
  id?: string;
};

export type TButton = {
  click?: () => void ;
  text: string;
  size: string;
  disabled?: boolean;
};

export type TCardProps = {
  img: string;
  id: string;
  name: string;
  city: string;
};

export type TAuth = {
  isAuth: boolean;
  isAdmin: boolean;
  userData: TProfileID | null;
  id: string;
  theme?:string | null;
};

//Работа с API бекенда
//Краткая информация о студенте
export type TUserDataDetail = {
  email: string;
  cohort: string;
  _id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
};

//Получение списка студентов
export type TUsersDataDetail = {
  total: number;
  items: TUserDataDetail[];
};

//Информация для профиля пользователя
export type TProfile = {
  name: string;
  photo: string;
  city: {
    geocode: number[];
    name: string;
  };
  birthday: string;
  quote: string;
  telegram: string;
  github: string;
  template: string;
};

export type TProfileInfoItem = {
  text: string;
  image?: string;
  reactions: number;
};

//Информация о личной жизни студента
export type TProfileInfo = {
  hobby: TProfileInfoItem;
  status: TProfileInfoItem;
  job: TProfileInfoItem;
  edu: TProfileInfoItem;
};

//Полная детальная информации о студенте по ID (тип для get и patch запросов)
export type TProfileID = {
  email: string;
  cohort: string;
  _id: string;
  createdAt: number;
  updatedAt: number;
  profile: TProfile;
  info: TProfileInfo;
  reactions: TReactionsRequest;
};

//Реакции конкретного пользователя
export type TProfileReactions = {
  text: string;
  _id: string;
  from: {
    cohort: string;
    email: string;
    name: string;
    _id: string;
  };
  target: string;
  emotion?: string;
};

//Получение реакций пользователей для конкретного пользователя
export type TReactionsRequest = {
  total: number;
  items: TProfileReactions[];
};

//Комментарий пользователя
export type TComment = {
  text: string;
  _id: string;
  from: {
    email: string;
    name: string;
    _id: string;
  };
  target: string;
  to: {
    _id: string;
    name: string;
    email: string;
  };
  cohort?: string;
  date?: string;
};

//Получение всех комментариев пользователей
export type TCommentsRequest = {
  total: number;
  items: TComment[];
};

export type TContext =
  | {
      state: TAuth;
      setState?: Dispatch<SetStateAction<TAuth>> | TFcVoid;
    }
  | any;

export type TFile = {
  email: string;
  cohort: string;
};

export type TProtectedLink = {
  className: string;
  to: string;
  children: ReactNode;
};

export type TStateDataMapPage = {
  isDataRequest: boolean;
  usersData: TProfileID[] | null;
};

export type TCards = {
  users: TProfileID[] | null;
};

export type TCardProfileData =
  | {
      data: TProfileID | null;
      reactions: TCardProfileReactions | null;
    }
  | any;

export type TDefaultProfileData = {
  email: string;
  cohort: string;
  _id: string;
  createdAt: number;
  updatedAt: number;
  profile: {
    name: string;
    photo: string;
    city: {
      name: string;
      geocode: number[];
    };
  };
};

export type TDefaultProfilesData = {
  total: number;
  items: TDefaultProfileData[];
};

export type TCardProfileReactions = {
  total: number;
  items: TProfileReactions[];
};

export type TFeedbackBlock = {
  open: boolean;
  //Дописать тип для реакций
  profileData: TCardProfileData;
  target: string;
  size?: string;
};

export type TDefaultReactionsData = {
  item: string;
  count: number;
  id: number;
};

export type TUseFeedBack = (
  profileData: TProfileID,
  setReactions: any,
  target: string
) => void;

export type TProfileStateForm = {
  profile: {
    name: string;
    photo: string;
    city: { name: string; geocode: number[] };
    birthday: string;
    quote: string;
    telegram: string;
    github: string;
    template: string;
  };
  info: {
    hobby: TProfileInfoItem;
    status: TProfileInfoItem;
    job: TProfileInfoItem;
    edu: TProfileInfoItem;
  };
} | any
