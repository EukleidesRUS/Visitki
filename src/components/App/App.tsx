import { FC, useState, useEffect } from "react";
import { AuthContext } from "../../services/AuthContext";
import { TAuth, TProfileID } from "../../utils/types";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ProtectedRoute } from "../../services/ProtectedRoute/ProtectedRoute";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { AdminPage } from "../../pages/AdminPage/AdminPage";
import MapPage from "../../pages/MapPage/MapPage";
import ProfileDetailsPage from "../../pages/ProfileDetailsPage/ProfileDetailsPage";
import { getUserProfile } from "../../utils/api/api";
import { CohortPage } from "../../pages/ChogortPage/ChogortPahe";

const App: FC = (): JSX.Element => {
  const [state, setState] = useState<TAuth>({
    isAuth: false,
    isAdmin: true,
    id: "2cb3baaa7528a9bb5e2c20d9",
    userData: null,
    theme: null,
  });
  
  //Проверяем, записан ли токен в локальном хранилище, если да,
  //то записываем в переменную.
  const tokenLocal = localStorage.getItem("token") || null;

  useEffect(() => {
    if (tokenLocal) {
      //Записываем данные первого пользователя полученного из массива переданного бекендом
      //Данные администратор или нет, а так же id пользователя хардкодим.
      getUserProfile("state.id").then((res: TProfileID) =>
        setState({ ...state, isAuth: true, isAdmin: false, userData: res })
      ).catch((err) => console.log(`При отправке запроса данных пользователя произошла ${err}`));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<MainPage />} />
            <Route path="cohort/:name" element={<CohortPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="details/:id" element={<ProfileDetailsPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="map" element={<MapPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
