import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weekSchedule, setWeekSchedule] = useState([]);
  const [tasksDueSoon, setTasksDueSoon] = useState([]); // 오늘 날짜 tasks
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextSchedule, setNextSchedule] = useState(null);

  useEffect(() => {
    // 닉네임 가져오기
    const storedNickname = sessionStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }

    // 현재 시간 1초마다 업데이트
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 전체 스케줄 데이터 불러오기 ("/schedule" 키)
    const scheduleData = JSON.parse(localStorage.getItem("schedule")) || {};

    // 1. 이번 주 일정 가져오기
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() + 6));

    const weekScheduleData = [];
    Object.keys(scheduleData).forEach((date) => {
      const scheduleDate = new Date(date);
      if (scheduleDate >= startOfWeek && scheduleDate <= endOfWeek) {
        const dayOfWeek = scheduleDate.getDay();
        // scheduleData[date] => { schedule: [...], tasks: [...] }
        weekScheduleData[dayOfWeek] = scheduleData[date].schedule || [];
      }
    });
    setWeekSchedule(weekScheduleData);

    // 2. 오늘 날짜의 tasks 불러오기 (/schedule에서)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 오늘 날짜에 해당하는 { schedule, tasks } 객체
    const todayScheduleObj = scheduleData[todayStr] || { tasks: [] };
    // 오늘 날짜에 저장된 tasks 배열(문자열 배열이라고 가정)
    setTasksDueSoon(todayScheduleObj.tasks || []);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // "오늘"의 일정 배열
    const dayIndex = new Date().getDay();
    const todaySchedule = weekSchedule[dayIndex] || [];

    // 현재 시간(시 * 60 + 분)
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // 시간 순으로 정렬 (오전 7시부터 순서대로 가정)
    const sortedSchedule = [...todaySchedule].sort((a, b) => {
      if (!a.time || !b.time) return 0;
      const [aStart] = a.time.split(" - ");
      const [bStart] = b.time.split(" - ");
      const [aH, aM] = aStart.split(":").map(Number);
      const [bH, bM] = bStart.split(":").map(Number);
      return aH * 60 + aM - (bH * 60 + bM);
    });

    let foundCurrent = null; 
    let foundNext = null;

    // 순회하며 현재 시간에 해당하는 schedule, 다음 schedule을 찾음
    for (const item of sortedSchedule) {
      if (!item?.time) continue;
      const [startStr, endStr] = item.time.split(" - ");
      const [startH, startM] = startStr.split(":").map(Number);
      const [endH, endM] = endStr.split(":").map(Number);
      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      // 현재 시간 구간
      if (nowMinutes >= startTotal && nowMinutes < endTotal) {
        foundCurrent = item;
      }
      // 아직 current를 찾지 못했거나, 이미 찾았는데 nextSchedule이 안 정해졌을 때
      else if (nowMinutes < startTotal && !foundNext) {
        foundNext = item;
      }
      // 이미 next를 찾았다면 더 볼 필요 없이 break 가능 (시간 순이라 맨 처음 것이 다음 일정)
      if (foundNext && foundCurrent) {
        break;
      }
    }

    setCurrentSchedule(foundCurrent);
    setNextSchedule(foundNext);
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
                          if (!item?.time) return false;
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

        {/* 과제 To-Do-List (오늘 날짜 기준 schedule[].tasks 표시) */}
        <div className={styles.toDoList}>
          <h3>TO-DO</h3>
          <ul>
            {tasksDueSoon.map((task, index) => (
              <li key={index}>{task}</li>
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
