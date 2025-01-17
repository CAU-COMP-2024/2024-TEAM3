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

    // 1초마다 현재 시간 갱신
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 로컬 스토리지에서 schedule 전체 불러오기
    const scheduleData = JSON.parse(localStorage.getItem("schedule")) || {};

    // --- 이번 주(일~토) 일정 수집 ---
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

    // --- 오늘 날짜의 tasks ---
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const todayScheduleObj = scheduleData[todayStr] || { tasks: [] };
    setTasksDueSoon(todayScheduleObj.tasks || []);

    return () => clearInterval(interval);
  }, []);

  // 현재 일정 / 다음 일정 업데이트
  useEffect(() => {
    const dayIndex = new Date().getDay();
    const todaySchedule = weekSchedule[dayIndex] || [];

    // 현재 시간(분 단위)
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // 일정 시간 순으로 정렬
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
      // 다음 일정
      else if (nowMinutes < startTotal && !foundNext) {
        foundNext = item;
      }

      if (foundCurrent && foundNext) break;
    }

    setCurrentSchedule(foundCurrent);
    setNextSchedule(foundNext);
  }, [currentTime, weekSchedule]);

  return (
    <div className={styles.homeContainer}>
      {/* 좌측 사이드바 (그대로 유지) */}
      <aside className={styles.sidebar}>
        <div className={styles.allHere}>ALL HERE</div>
        <div className={styles.sidebarMenu}>
          <div className={styles.menuHeader}>개인용</div>
          {/* ------ Things to do 클릭 시 /things-to-do로 이동 ------ */}
          <div className={styles.menuItem}>
            <Link to="/things-to-do" style={{ color: "#fff", textDecoration: "none" }}>
              Things to do
            </Link>
          </div>
          {/* ------ All about exam 클릭 시 /all-about-exam로 이동 ------ */}
          <div className={styles.menuItem}>
            <Link to="/all-about-exam" style={{ color: "#fff", textDecoration: "none" }}>
              All about exam
            </Link>
          </div>
          <div className={styles.menuItem2}>과목 1</div>
          <div className={styles.menuItem2}>과목 2</div>
          <div className={styles.menuItem2}>과목 3</div>

        </div>
      </aside>

      {/* 오른쪽 메인 컨테이너 */}
      <div className={styles.mainContainer}>
        {/* ---- 상단 네비게이션 바 (ThingsToDo.jsx와 동일) ---- */}
        <div className={styles.navbar}>
          <span className={styles.navLink}>
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              MAIN
            </Link>
          </span>
          <span className={styles.navLinkNow}>개인용</span>
        </div>

        {/* 환영 메시지 */}
        <div style={{ marginLeft: "70px", fontSize: "1.2rem", marginBottom: "20px" }}>
          Welcome {nickname ? `${nickname}!` : "USER!"}
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className={styles.content}>
          {/* 주간 일정 (테이블) */}
          <div className={styles.calendarContainer}>
            <h2>이번 주 일정</h2>
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
                    <td>{`${7 + i}:00 ~ ${8 + i}:00`}</td>
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

          {/* 우측 영역: 오늘의 일정 / TO-DO */}
          <div className={styles.taskContainer}>
            {/* 오늘 일정 */}
            <div className={styles.todaySchedule}>
              <h3 className={styles.sectionTitle}>오늘의 일정</h3>
              <p>{currentTime.toLocaleDateString()}</p>
              <p>{currentTime.toLocaleTimeString()}</p>
              <p>현재 일정: {currentSchedule?.description || "없음"}</p>
              <p>다음 일정: {nextSchedule?.description || "없음"}</p>
            </div>

            {/* 오늘까지가 마감기한인 것 (TO-DO) */}
            <div className={styles.dueTasks}>
              <h3 className={styles.sectionTitle}>오늘의 TO-DO</h3>
              <ul>
                {tasksDueSoon.length > 0 ? (
                  tasksDueSoon.map((task, index) => (
                    <li key={index}>{task}</li>
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

export default Home;
