import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import styles from "./Home.module.css";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // 닉네임 가져오기
        const storedNickname = sessionStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        }
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);
  return (
    <div className={styles.container}>
      {/* 좌측 네비게이션 바 */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ALL HERE</div>
        <nav className={styles.nav}>
          <div className={styles.section}>
            <h3>개인용</h3>
            <ul>
              <li>Things to do</li>
              <li>All about exam</li>
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
          <Link to="/home">MAIN</Link> {/* MAIN 링크 */}
          <Link to="/personal">개인용</Link> {/* 개인용 링크 */}
          <Link to="/team">팀플용</Link> {/* 팀플용 링크 */}
        </header>
        {/* Welcome 메시지 */}
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
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 우측 상단: 과제 To-Do-List */}
        <div className={styles.toDoList}>
          <h3>TO-DO</h3>
          <ul>
            <li>
              <span>d-day</span> 예제 과제 1
            </li>
            <li>
              <span>d-1</span> 예제 과제 2
            </li>
            <li>
              <span>d-4</span> 예제 과제 3
            </li>
          </ul>
        </div>

        {/* 우측 하단: 오늘의 일정 */}
        <div className={styles.todaySchedule}>
          <h3>오늘의 일정</h3>
          <div className={styles.dateTime}>
            <p>{currentTime.toLocaleDateString()}</p>
            <p>{currentTime.toLocaleTimeString()}</p>
          </div>
          <div className={styles.scheduleDetails}>
            <p>현재 일정: 예시 일정</p>
            <p>다음 일정: 예시 일정</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
