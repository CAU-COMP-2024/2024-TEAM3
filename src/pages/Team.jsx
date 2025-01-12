import React from "react";
import { Link } from "react-router-dom";
import TeamMenu from "../components/TeamMenu"; // TeamMenu 컴포넌트 임포트
import styles from "./Personal.module.css"; // 기존 CSS 사용

const Team = () => {
  return (
    <div className={styles.container}>
      {/* 좌측 네비게이션 바 */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ALL HERE</div>
        <nav className={styles.nav}>
          {/* 개인용 섹션 */}
          <div className={styles.section}>
            <h3>개인용</h3>
            <ul>
              <li>
                <Link to="/personal">Things to do</Link>
              </li>
              <li>All about exam</li>
              <li className={styles.subItem}>과제1</li>
              <li className={styles.subItem}>과제2</li>
              <li className={styles.subItem}>과제3</li>
            </ul>
          </div>

          {/* 팀플용 섹션 */}
          <div className={styles.section}>
            <h3>팀플용</h3>
            <TeamMenu /> {/* TeamMenu 통합 */}
          </div>
        </nav>
        <footer className={styles.footer}>
          <div>계정</div>
          <div>설정</div>
        </footer>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        <header className={styles.navbar}>
          <span>
            <Link to="/home">MAIN</Link>
          </span>
          <span>
            <Link to="/personal">개인용</Link> {/* 개인용 링크 */}
          </span>
          <span>팀플용</span>
        </header>
        <h1>팀플용 페이지</h1>
        {/* 나머지 메인 콘텐츠 추가 가능 */}
      </main>
    </div>
  );
};

export default Team;

