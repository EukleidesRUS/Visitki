import { FC, useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { TCohortPage } from "../../utils/types";
import MainPage from "../MainPage/MainPage";

export const CohortPage: FC<TCohortPage> = ():JSX.Element => {
  const { state} = useContext(AuthContext)
  const location = useLocation();
  const { name } = useParams<string>();
  
  if (!state.isAdmin) {return <Navigate to={"/login"} state={{ from: location }} />;}

  return <MainPage cohort={name} />;
};