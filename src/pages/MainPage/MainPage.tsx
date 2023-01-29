import { useState, useRef, useEffect, useContext, SyntheticEvent, ChangeEventHandler } from "react";
import arrowIcon from "../../icons/arrow_home.svg";
import styles from "./MainPage.module.css";
import ProtectedLink from "../../HOC/ProtectedLink";
import Card from "../../components/Card/Card";
import { getDefaultProfiles } from "../../utils/api/api";
import { TCards, TProfileID } from "../../utils/types";
import Preloader from "../../components/Preloader/Preloader";
import { AuthContext } from "../../services/AuthContext";

const citiesArray = [{ city: "Все города" }];

const MainPage = ({ cohort }: { cohort?: string }): JSX.Element => {
  const {state} = useContext(AuthContext)
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    selected: "Все города",
  });
  const [cards, setCards] = useState<TCards>({
    users: null,
  });
  const sortRef: { current: HTMLDivElement | null } = useRef(null);
  // Открытие/закрытие фильтра
  const filterSet = () => {
    setIsOpened(!isOpened);
  };

  // Изменение фильтра
  const selectItem = (city: string) => {
    setSelectedItem({ ...selectItem, selected: city });
  };
  //Добавление городов пользователей в список
  let users = cards.users;

  const createCitiesArray = (users: TProfileID[]) => {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      citiesArray.push({ city: user.profile.city.name });
    }
  };

  function searchFilter(users: TProfileID[]) {
    
    if (selectedItem.selected === "Все города") {
      return users;
    } else {
      return users.filter((user: TProfileID) => user.profile.city.name.includes(selectedItem.selected));
    }
  }

  useEffect(() => {
    getDefaultProfiles().then((res) =>
      setCards({
        ...cards,
        users: res.items,
      })
    );
  }, []);

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

  useEffect(() => {
    if (users) {
      createCitiesArray(users);
    }
  }, [state]);

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
              {citiesArray.map((item, index) => {
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
          {users && searchFilter(users).map((cardData: TProfileID) => (
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
