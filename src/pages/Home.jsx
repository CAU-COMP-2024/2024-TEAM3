import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weekSchedule, setWeekSchedule] = useState([]);
  const [tasksDueSoon, setTasksDueSoon] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextSchedule, setNextSchedule] = useState(null);
  useEffect(() => {
    // 닉네임 가져오기
    const storedNickname = sessionStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }

    // 현재 시간 업데이트
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // /schedule 데이터 가져오기
    const scheduleData = JSON.parse(localStorage.getItem("schedule")) || {};
    const tasksData = JSON.parse(localStorage.getItem("tasks")) || [];

    // 1. 일주일 일정 가져오기
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));

    const weekScheduleData = [];
    Object.keys(scheduleData).forEach((date) => {
      const scheduleDate = new Date(date);
      if (scheduleDate >= startOfWeek && scheduleDate <= endOfWeek) {
        const dayOfWeek = scheduleDate.getDay();
        weekScheduleData[dayOfWeek] = scheduleData[date];
      }
    });
    setWeekSchedule(weekScheduleData);

    // 2. D-7 이내 할 일 목록 가져오기
    const tasksDue = tasksData.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const daysLeft = (dueDate - new Date()) / (1000 * 60 * 60 * 24);
      return daysLeft >= 0 && daysLeft <= 7;
    });
    setTasksDueSoon(tasksDue);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 현재와 다음 일정 업데이트
    const todaySchedule = weekSchedule[new Date().getDay()] || [];
    const currentTimeStr = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    let foundCurrent = false;

    todaySchedule.forEach((item) => {
      const [start, end] = item.time.split(" - ");
      if (!foundCurrent && currentTimeStr >= start && currentTimeStr < end) {
        setCurrentSchedule(item);
        foundCurrent = true;
      } else if (foundCurrent && currentTimeStr < start) {
        setNextSchedule(item);
        return;
      }
    });

    if (!foundCurrent) setCurrentSchedule(null);
    if (!nextSchedule) setNextSchedule(todaySchedule[0]);
  }, [currentTime, weekSchedule]);

  return (
    <div className={styles.container}>
      {/* 좌측 네비게이션 바 */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ALL HERE</div>
        <nav className={styles.nav}>
          <div className={styles.section}>
            <h3>개인용</h3>
            <ul>
              <li>
                <Link to="/things-to-do">Things to do</Link>
              </li>
              <li>
                <Link to="/all-about-exam">All about exam</Link>
              </li>
              <li className={styles.subItem}>과제1</li>
              <li className={styles.subItem}>과제2</li>
              <li className={styles.subItem}>과제3</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h3>팀플용</h3>
            <ul>
              <li>프로젝트 1</li>
              <li className={styles.subItem}>역할 분담</li>
              <li className={styles.subItem}>회의</li>
              <li className={styles.subItem}>문서</li>
              <li>프로젝트 2</li>
            </ul>
          </div>
        </nav>
        <footer className={styles.footer}>
          <div>계정</div>
          <div>설정</div>
        </footer>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className={styles.mainContent}>
        <header className={styles.navbar}>
          <Link to="/home">MAIN</Link>
          <Link to="/personal">개인용</Link>
          <Link to="/team">팀플용</Link>
        </header>

        <div className={styles.welcome}>
          Welcome {nickname ? `${nickname}!` : "USER!"}
        </div>

        {/* 일정 테이블 */}
        <div className={styles.scheduleContainer}>
          <table className={styles.scheduleTable}>
            <thead>
              <tr>
                <th></th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
                <th>일</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 17 }, (_, i) => (
                <tr key={i}>
                  <td>{`${7 + i}:00~${8 + i}:00`}</td>
                  {Array.from({ length: 7 }, (_, j) => (
                    <td key={j}>
                      {(weekSchedule[j] || [])
                        .filter((item) => {
                          const [start] = item.time.split(" - ");
                          return parseInt(start.split(":")[0], 10) === 7 + i;
                        })
                        .map((item) => item.description)
                        .join(", ")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 과제 To-Do-List */}
        <div className={styles.toDoList}>
          <h3>TO-DO</h3>
          <ul>
            {tasksDueSoon.map((task, index) => (
              <li key={index}>
                <span>{`d-${Math.ceil(
                  (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
                )}`}</span>{" "}
                {task.description}
              </li>
            ))}
          </ul>
        </div>

        {/* 오늘의 일정 */}
        <div className={styles.todaySchedule}>
          <h3>오늘의 일정</h3>
          <div className={styles.dateTime}>
            <p>{currentTime.toLocaleDateString()}</p>
            <p>{currentTime.toLocaleTimeString()}</p>
          </div>
          <div className={styles.scheduleDetails}>
            <p>현재 일정: {currentSchedule?.description || "없음"}</p>
            <p>다음 일정: {nextSchedule?.description || "없음"}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
