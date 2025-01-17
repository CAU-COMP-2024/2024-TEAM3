import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    // "schedule" 키에서 전체 스케줄을 불러오고,
    // 현재 날짜(formattedDate)에 해당하는 일정/할 일을 꺼냅니다.
    const allSchedules = JSON.parse(localStorage.getItem("schedule")) || {};
    const savedData = allSchedules[formattedDate] || {
      schedule: [],
      tasks: [],
    };

    // schedule 배열이 [{ time: "7:00 - 8:00", description: "..." }, ...] 형태라고 가정
    // description이 비어 있으면 제외
    const formattedSchedule = (savedData.schedule || []).filter(
      (item) => item.description
    );

    // 같은 내용(description)이 연속된 시간대에 걸쳐 있으면 병합
    const mergedSchedule = [];
    formattedSchedule.forEach((item) => {
      if (
        mergedSchedule.length > 0 &&
        mergedSchedule[mergedSchedule.length - 1].description === item.description
      ) {
        const last = mergedSchedule.pop();
        mergedSchedule.push({
          time: `${last.time.split(" - ")[0]} - ${
            item.time.split(" - ")[1]
          }`,
          description: item.description,
        });
      } else {
        mergedSchedule.push(item);
      }
    });

    setTodaySchedule(mergedSchedule);
    setTodayTasks(savedData.tasks || []);
  }, [formattedDate]);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return newDate;
    });
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return newDate;
    });
  };

  // 달력 데이터 생성 함수
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDay = firstDayOfMonth.getDay(); // 이번 달 1일의 요일
    const daysInMonth = lastDayOfMonth.getDate(); // 이번 달 총 일수

    const calendar = [];
    let currentDay = 1;

    for (let week = 0; week < 6; week++) {
      const weekRow = [];
      for (let day = 0; day < 7; day++) {
        // 첫 주에서 firstDay 이전이면 빈 칸
        if (week === 0 && day < firstDay) {
          weekRow.push("");
        }
        // 이번 달 일수를 초과하면 빈 칸
        else if (currentDay > daysInMonth) {
          weekRow.push("");
        } else {
          // 실제 날짜(1 ~ daysInMonth)
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
      {/* 왼쪽 사이드바 */}
      <div className={styles.sidebar}>
        <div className={styles.allHere}>ALL HERE</div>
        <div className={styles.sidebarMenu}>
          <div className={styles.menuHeader}>개인용</div>
          <div className={styles.menuItem}>Things to do</div>
          <div className={styles.menuItem}> <Link to="/all-about-exam" style={{ color: "#fff", textDecoration: "none" }}>
              All about exam
            </Link></div>
          <div className={styles.menuItem2}>과목 1</div>
          <div className={styles.menuItem2}>과목 2</div>
          <div className={styles.menuItem2}>과목 3</div>

        </div>
      </div>

      {/* 오른쪽 메인 컨테이너 */}
      <div className={styles.mainContainer}>
        {/* 상단 네비게이션 바 */}
        <div className={styles.navbar}>
          <span className={styles.navLink}>
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              MAIN
            </Link>
          </span>
          <span className={styles.navLinkNow}>개인용</span>
        </div>

        {/* 메인 콘텐츠 영역 (달력 + 일정/할일) */}
        <div className={styles.content}>
          {/* 달력 영역 */}
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
                          navigate(
                            `/schedule?date=${currentDate.getFullYear()}-${(
                              currentDate.getMonth() + 1
                            )
                              .toString()
                              .padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                          )
                        }
                      >
                        {day}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 우측 일정/마감기한 영역 */}
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
