import styles from "./CalendarInput.module.css";
import { months } from "../../../utils/dates";
import { useState, MouseEventHandler, ChangeEventHandler, SyntheticEvent } from "react";
import calendarIcon from "../../../icons/forms-icons/calendar.svg";
import { SyntheticExpression } from "typescript";

export const CalendarInput = ({birthday}: {birthday: string}): JSX.Element => {
  //Данные о дне рождения с сервера не испольхуются, т.к. оттуда приходят некоректные данные. 
  //А именно, день недели, месяц, год.
  let todayYear = 0;
  todayYear = new Date().getFullYear();
  let years = [];
  let days: number[] = [];
  let psevdoDays: number[] = [];
  for (let i = todayYear; i > 1960; i--) {
    years.push(i);
  }

  let [isShow, setShow] = useState(false);
  let [date, setDay] = useState(1);
  let [year, setYear] = useState(todayYear);
  let [month, setMonth] = useState("Январь");

  const showCalendar = () => {
    setShow((isShow) => !isShow);
  };

  const setNewYear: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setYear(((year) = evt.target.value as unknown as number));
  };

  const setNewMonth: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setMonth((month = evt.target.value));
    prepareDays();
  };

  const setNewDay = (evt: any) => {
    console.log(evt);
    
    setDay((date = evt.target.value as unknown as number));
  };

  const prepareDays = () => {
    for (let el of months) {
      if (el.name === month) {
        for (let i = 1; i <= el.days; i++) {
          days.push(i);
        }
      }
    }
  };
  prepareDays();

  const monthsNumbers: { [key: string]: string } = {
    Январь: "01",
    Февраль: "02",
    Март: "03",
    Апрель: "04",
    Май: "05",
    Июнь: "06",
    Июль: "07",
    Август: "08",
    Сентябрь: "09",
    Октябрь: "10",
    Ноябрь: "11",
    Декабрь: "12",
  };

  const psevdoDaysLeft = 35 - days.length;

  for (let i = 1; i <= psevdoDaysLeft; i++) {
    psevdoDays.push(i);
  }

  return (
    <div className={styles.section_wrapper}>
      <img className={styles.icon} src={calendarIcon} onClick={showCalendar} alt="Календарь"/>
      <input
        className={styles.input}
        readOnly
        value={`${date}.${monthsNumbers[month]}.${year}`}
      ></input>
      {isShow && (
        <div className={styles.calendar_box}>
          <div className={styles.buttons_wrapper}>
            <select className={styles.years_button} onChange={setNewYear}>
              {years.map((el, index) => (
                <option value={el} key={index}>
                  {el}
                </option>
              ))}
            </select>
            <select className={styles.months_button} onChange={setNewMonth}>
              {months.map((el, index) => (
                <option value={el.name} key={index}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <ul className={styles.days_list}>
              {days.map((day, index) => {
                return (
                  <li
                    className={`${styles.day_box} ${
                      date === day && styles.active
                    }`}
                    onClick={setNewDay}
                    value={day}
                    key={index}
                  >
                    {day}
                  </li>
                );
              })}
              {psevdoDays.map((day, index) => (
                <li className={styles.psevdo_box} key={index}>
                  {day}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};