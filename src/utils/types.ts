import { Dispatch, SetStateAction } from "react";

export type TFcVoid = () => void;

export type TButton = {
  click: () => void;
  text: string;
  size: string;
  disabled: boolean;
};

export type TAuth= {
  isAuth: boolean;
  token: string | null;
  isAdmin: boolean;
  userData: {
    _id: string;
    createdAt: null;
    email: string;
    cohort: string;
    name: string;

  } | null;
};

export type TContext = {
  state: TAuth;
  setState?: Dispatch<SetStateAction<TAuth>> | TFcVoid;
} | any;