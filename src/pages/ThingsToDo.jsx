import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ThingsToDo.module.css";

const ThingsToDo = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태
  const [todaySchedule, setTodaySchedule] = useState([]); // 오늘의 일정
  const [todayTasks, setTodayTasks] = useState([]); // 오늘까지가 마감기한인 것

  // 오늘 날짜 포맷팅
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  // 오늘의 일정 및 할 일 데이터 로드
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(formattedDate)) || {};

    const formattedSchedule = (savedData.schedule || [])
      .map((item, index) => ({
        time: `${7 + index}:00 - ${8 + index}:00`,
        description: item,
      }))
      .filter((item) => item.description);

    const mergedSchedule = [];
    formattedSchedule.forEach((item) => {
      if (
        mergedSchedule.length > 0 &&
        mergedSchedule[mergedSchedule.length - 1].description === item.description
      ) {
        const last = mergedSchedule.pop();
        mergedSchedule.push({
          time: `${last.time.split(" - ")[0]} - ${item.time.split(" - ")[1]}`,
          description: item.description,
        });
      } else {
        mergedSchedule.push(item);
      }
    });

    setTodaySchedule(mergedSchedule);
    setTodayTasks(savedData.tasks || []);
  }, [formattedDate]);

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const calendar = [];
    let currentDay = 1;

    for (let week = 0; week < 6; week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDay) {
          weekRow.push("");
        } else if (currentDay > daysInMonth) {
          weekRow.push("");
        } else {
          weekRow.push(currentDay++);
        }
      }
      calendar.push(weekRow);
      if (currentDay > daysInMonth) break;
    }

    return calendar;
  };

  const calendar = generateCalendar(currentDate);

  return (
    <div className={styles.thingsToDo}>
      <div className={styles.sidebar}>
        <div className={styles.allHere}>ALL HERE</div>
        <div className={styles.sidebarMenu}>
          <div className={styles.menuHeader}>개인용</div>
          <div className={styles.menuItem}>Things to do</div>
          <div className={styles.menuItem}>All about exam</div>
          <div className={styles.menuItem2}>과목 1</div>
          <div className={styles.menuItem2}>과목 2</div>
          <div className={styles.menuItem2}>과목 3</div>
          <div className={styles.menuHeader}>팀플용</div>
          <div className={styles.menuItem}>프로젝트 1</div>
          <div className={styles.menuItem}>프로젝트 2</div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.navbar}>
          <span className={styles.navLink}>MAIN</span>
          <span className={styles.navLinkNow}>개인용</span>
          <span className={styles.navLink}>팀플용</span>
        </div>

        <div className={styles.content}>
          <div className={styles.calendarContainer}>
            <div className={styles.calendarHeader}>
              <button onClick={goToPreviousMonth} className={styles.arrowButton}>
                {"<"}
              </button>
              <h2>
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button onClick={goToNextMonth} className={styles.arrowButton}>
                {">"}
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendar.map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => (
                      <td
                        key={j}
                        className={day ? styles.activeDay : styles.inactiveDay}
                        onClick={() =>
                          day &&
                          navigate(`/schedule?date=${currentDate.getFullYear()}-${(
                            currentDate.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`)}
                      >
                        {day}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.taskContainer}>
            <div className={styles.todaySchedule}>
              <h3 className={styles.sectionTitle}>오늘의 일정</h3>
              <ul>
                {todaySchedule.length > 0 ? (
                  todaySchedule.map((item, index) => (
                    <li key={index} className={styles.scheduleItem}>
                      {item.time} - {item.description}
                    </li>
                  ))
                ) : (
                  <li>등록된 일정이 없습니다.</li>
                )}
              </ul>
            </div>

            <div className={styles.dueTasks}>
              <h3 className={styles.sectionTitle}>오늘까지가 마감기한인 것</h3>
              <ul>
                {todayTasks.length > 0 ? (
                  todayTasks.map((task, index) => (
                    <li key={index} className={styles.taskItem}>
                      {task}
                    </li>
                  ))
                ) : (
                  <li>등록된 할 일이 없습니다.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDo;
