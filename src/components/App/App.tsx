import { FC, useState } from "react";
import Login from "../../pages/Login/Login";
import { AuthContext } from "../../services/AuthContext";
import { TAuth } from "../../utils/types";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from '../../services/ProtectedRoute/ProtectedRoute'
import { SearchPage } from "../SearchPage/SearchPage";
import { Profile } from "../../pages/Profile/Profile";

const App: FC = () => {
  const [state, setState] = useState<TAuth>({
    isAuth: false,
    token: null,
    userData: null,
    isAdmin: false,
  });

  return (
    <AuthContext.Provider value={{state, setState}}>
      <div className={styles.page}>
        <Header />
        <Switch>
        <ProtectedRoute isAuth={state.isAuth} isAdmin={state.isAdmin} anonymous={true} path="/login" exact={true}>
        <div className={styles.main}>
          <Login />
        </div>
        </ProtectedRoute>
        
        <ProtectedRoute isAuth={state.isAuth} isAdmin={state.isAdmin} path="/moder" exact={true}>
        <div className={styles.main}>
          <SearchPage />
        </div>
        </ProtectedRoute>

        <ProtectedRoute isAuth={state.isAuth} isAdmin={state.isAdmin} path="/profile" exact={true}>
        <div className={styles.main}>
          <Profile />
        </div>
        </ProtectedRoute>


        </Switch>
        
       
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;