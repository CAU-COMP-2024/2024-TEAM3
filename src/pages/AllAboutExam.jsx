import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AllAboutExam.module.css";

const AllAboutExam = () => {
  const navigate = useNavigate();

  // 시험 일정표
  const [schedule, setSchedule] = useState({});
  // 과목 배열 (예: [{ name, detail: { date, time, place, scope, studyProgress } }, ...])
  const [subjects, setSubjects] = useState([]);

  // 현재 선택된 과목 이름
  const [selectedSubject, setSelectedSubject] = useState("");

  // 마운트 시 examSchedule, subjects 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("examSchedule")) || {};
    setSchedule(saved);

    const stored = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(stored);
  }, []);

  // “+ 추가” 버튼
  const handleAddClick = () => {
    navigate("/exam");
  };

  // 월~금
  const days = ["월", "화", "수", "목", "금"];

  // 현재 선택된 과목 detail
  const currentSubjectObj = subjects.find((s) => s.name === selectedSubject);

  // 수정 버튼 → /ExamExplain?subject=과목명
  const handleEdit = () => {
    if (!selectedSubject) return;
    navigate(`/ExamExplain?subject=${encodeURIComponent(selectedSubject)}`);
  };

  return (
    <div className={styles.allAboutExam}>
      {/* 좌측 사이드바(네비게이션) 영역 (하드코딩된 과목1, 과목2, 과목3 제거) */}
      <div className={styles.sidebar}>
        <h3>개인용</h3>
        <div onClick={() => navigate("/things-to-do")}>Things to do</div>
        <div>All about exam</div>
        {/* 동적 과목 목록 */}
        {subjects.map((subj) => (
          <div
            key={subj.name}
            style={{ cursor: "pointer", marginLeft: "20px" }}
            onClick={() => setSelectedSubject(subj.name)}
          >
            {subj.name}
          </div>
        ))}

      </div>

      {/* 상단 네비게이션 */}
      <div className={styles.navbar}>
        <span onClick={() => navigate("/home")}>MAIN </span>
        <span>개인용</span>
        <span onClick={() => navigate("/team")}> 팀플용</span>
      </div>

      <div className={styles.title}>개인용 - All about exam</div>
      <div className={styles.comp}>오늘의 주요일정: COMP 프로젝트 발표</div>

      {/* 좌측 일정표 UI */}
      <div className={styles.scheduleContainer}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>시간</th>
              {days.map((day, i) => (
                <th key={i}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, row) => (
              <tr key={row}>
                <td>{`${9 + row}:00~${10 + row}:00`}</td>
                {days.map((d) => (
                  <td key={d}>{schedule[d]?.[row] || ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 우측 상단: 시험 과목 설명 */}
      <div className={styles.subjectDetail}>
        <h2>시험 과목 설명</h2>
        {currentSubjectObj ? (
          <div>
            <p>
              과목명: <b>{currentSubjectObj.name}</b>
            </p>
            <p>시험 날짜: {currentSubjectObj.detail.date}</p>
            <p>시험 시간: {currentSubjectObj.detail.time}</p>
            <p>시험 장소: {currentSubjectObj.detail.place}</p>
            <p>시험 범위: {currentSubjectObj.detail.scope}</p>
            <button onClick={handleEdit}>수정</button>
          </div>
        ) : (
          <p>왼쪽 과목명을 클릭하세요.</p>
        )}
      </div>

      {/* 우측 하단: 공부 진행도(메모장) */}
      <div className={styles.studyProgress}>
        <h3>공부 진행도 현황</h3>
        {currentSubjectObj ? (
          <div>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {currentSubjectObj.detail.studyProgress || "(내용 없음)"}
            </pre>
          </div>
        ) : (
          <p>과목을 선택하면 표시됩니다.</p>
        )}
      </div>

      {/* +추가 버튼 */}
      <button className={styles.addButton} onClick={handleAddClick}>
        + 추가
      </button>
    </div>
  );
};

export default AllAboutExam;


