import React from "react";
import styles from "./Home.module.css";

const Home = () => {
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
          <span>MAIN</span>
          <span>개인용</span>
          <span>팀플용</span>
        </header>
      </main>
    </div>
  );
};

export default Home;
