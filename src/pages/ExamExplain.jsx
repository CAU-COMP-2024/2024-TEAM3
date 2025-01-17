import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ExamExplain.module.css";

const ExamExplain = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectName = searchParams.get("subject") || "";

  // 로컬 스토리지에서 불러온 subjects
  const [subjects, setSubjects] = useState([]);
  // 현재 과목 detail
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [scope, setScope] = useState("");
  const [studyProgress, setStudyProgress] = useState("");

  useEffect(() => {
    // subjects 불러오기
    const stored = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(stored);

    // 해당 과목 detail 초기화
    const found = stored.find((s) => s.name === subjectName);
    if (found) {
      setDate(found.detail.date || "");
      setTime(found.detail.time || "");
      setPlace(found.detail.place || "");
      setScope(found.detail.scope || "");
      setStudyProgress(found.detail.studyProgress || "");
    }
  }, [subjectName]);

  // 저장 버튼
  const handleSave = () => {
    // subjects에서 subjectName 일치하는 요소 업데이트
    const updated = subjects.map((s) => {
      if (s.name === subjectName) {
        return {
          ...s,
          detail: {
            ...s.detail,
            date,
            time,
            place,
            scope,
            studyProgress,
          },
        };
      }
      return s;
    });
    setSubjects(updated);
    localStorage.setItem("subjects", JSON.stringify(updated));

    // 저장 후 /all-about-exam으로 이동
    navigate("/all-about-exam");
  };

  return (
    <div className={styles.explainContainer}>
      <h2>시험 과목 정보 수정</h2>
      {subjectName ? (
        <div>
          <p>과목명: {subjectName}</p>
          <div>
            <label>시험 날짜:</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="예) 12/22 (화)"
            />
          </div>
          <div>
            <label>시험 시간:</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="예) 10:30 ~ 12:00"
            />
          </div>
          <div>
            <label>시험 장소:</label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="예) 303호"
            />
          </div>
          <div>
            <label>시험 범위:</label>
            <textarea
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="예) 교재 3장 ~ 5장"
            />
          </div>
          <div>
            <label>공부 진행도:</label>
            <textarea
              value={studyProgress}
              onChange={(e) => setStudyProgress(e.target.value)}
              placeholder="메모장 형태로 자유롭게 기록"
            />
          </div>
          <button onClick={handleSave}>저장</button>
        </div>
      ) : (
        <p>잘못된 접근입니다. 과목명이 없습니다.</p>
      )}
    </div>
  );
};

export default ExamExplain;
