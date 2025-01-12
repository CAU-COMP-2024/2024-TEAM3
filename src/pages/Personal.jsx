import React from "react";
import { Link } from "react-router-dom";
import styles from "./Personal.module.css"; // 새 CSS 파일 필요

const Personal = () => {
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
                <Link to="/personal">Things to do</Link>
              </li>
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

      {/* 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        <header className={styles.navbar}>
          <span>
            <Link to="/home">MAIN</Link>
          </span>
          <span>개인용</span>
          <span>
            <Link to="/team">팀플용</Link> {/* 팀플용 링크 */}
          </span>
        </header>
        <h1>개인용 페이지</h1>
        {/* 콘텐츠 추가 */}
      </main>
    </div>
  );
};

export default Personal;
