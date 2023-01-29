import { useState, useRef, useEffect, useContext, useCallback } from "react";
import arrowIcon from "../../icons/arrow_home.svg";
import styles from "./MainPage.module.css";
import ProtectedLink from "../../HOC/ProtectedLink";
import Card from "../../components/Card/Card";
import { getDefaultProfiles } from "../../utils/api/api";
import { TCards, TProfileID } from "../../utils/types";
import Preloader from "../../components/Preloader/Preloader";
import { AuthContext } from "../../services/AuthContext";

const MainPage = ({ cohort }: { cohort?: string }): JSX.Element => {
  //Стейт нужен будет в будущем, чтобы запрашивать для студента людей из его когорты
  const { state } = useContext(AuthContext);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    selected: "Все города",
  });
  const [cards, setCards] = useState<TCards>({
    users: null,
  });
  const [usersCities, setCities] = useState<any>(null);
  const sortRef: { current: HTMLDivElement | null } = useRef(null);
  // Открытие/закрытие фильтра
  const filterSet = () => {
    setIsOpened(!isOpened);
  };

  // Изменение фильтра
  const selectItem = (city: string) => {
    setSelectedItem({ ...selectItem, selected: city });
  };

  const citiesArray = useCallback(() => {
    let citiesArray = [];
    if (cards.users) {
      for (let i = 0; i < cards.users.length; i++) {
        const user = cards.users[i];
        citiesArray.push({ city: user.profile.city.name });
      }
      if (selectedItem.selected === "Все города") {
        setCities(citiesArray);
      } else {
        setCities(citiesArray.concat({ city: "Все города" }));
      }
    }
  }, [cards, selectedItem]);

  function searchFilter(usersCities: TProfileID[]) {
    if (usersCities && selectedItem.selected === "Все города") {
      return usersCities;
    } else {
      return usersCities.filter((user: TProfileID) =>
        user.profile.city.name.includes(selectedItem.selected)
      );
    }
  }

  useEffect(() => {
    citiesArray();
    //В будущем здесь должна быть логика отрисовки карточек пользователей выбранной админом когорты
    getDefaultProfiles().then((res) => {
      setCards({
        ...cards,
        users: res.items,
      });
    }).catch((err) => console.log(`При отправке запроса деволтных данных студентов произошла ${err}`));
  }, [cards]);

  useEffect(() => {
    const handleCloseOutsideClick = (evt: Event) => {
      if (sortRef.current) {
        if (!sortRef.current.contains(evt.target as Element)) {
          setIsOpened(false);
        }
      }
    };
    document.body.addEventListener("click", handleCloseOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleCloseOutsideClick);
    };
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.mainOptions}>
        <div
          className={styles.mainTownFilter}
          onClick={filterSet}
          ref={sortRef}
        >
          <div className={styles.mainTownFilterContent}>
            <p className={styles.mainTownFilterContentText}>
              {selectedItem.selected}
            </p>
            <img
              className={styles.mainTownFilterContentImg}
              src={arrowIcon}
              alt=""
            />
          </div>
          {isOpened && (
            <ul className={styles.mainTownFilterMenu}>
              {usersCities.length > 0 &&
                usersCities.map((item: any, index: any) => {
                  return (
                    <li
                      className={styles.mainTownFilterMenuItem}
                      key={index}
                      onClick={() => selectItem(item.city)}
                    >
                      {item.city}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
        <ProtectedLink to={"map"} className={styles.mainOptionsMapLink}>
          Посмотреть на карте
        </ProtectedLink>
      </div>
      {!cards.users ? (
        <Preloader />
      ) : (
        <div className={styles.cardContainer}>
          {cards &&
            searchFilter(cards.users).map((cardData: TProfileID) => (
              <Card
                key={cardData._id}
                id={cardData._id}
                img={cardData.profile.photo}
                name={cardData.profile.name}
                city={cardData.profile.city.name}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
