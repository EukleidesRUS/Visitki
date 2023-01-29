import { FC, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { TCohortPage } from "../../utils/types";
import MainPage from "../MainPage/MainPage";

export const CohortPage: FC<TCohortPage> = ():JSX.Element => {
  const { state} = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = useParams<string>();
  
  useEffect(() => {
    state.isAdmin ? <Navigate to="/login" state={{ from: location }} replace /> : navigate("/", {replace: true})
  }, [state.isAdmin]);

  return <MainPage cohort={name} />;
};