import React, { FC, useContext, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import MainPage from "../MainPage/MainPage";

interface ICohortPage {
  cohort?: string;
}

export const CohortPage: FC<ICohortPage> = () => {
  const { state} = useContext(AuthContext)
  const navigate = useNavigate();
  const { cohort } = useParams<string>();
  useEffect(() => {
    state.isAdmin ? navigate(`cohort:/${cohort}`, {replace: true}) : navigate("/", {replace: true})
  }, [state.isAdmin]);

  return <MainPage cohort={cohort} />;
};