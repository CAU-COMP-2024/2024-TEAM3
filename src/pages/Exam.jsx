import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Exam.module.css";

const Exam = () => {
  const navigate = useNavigate();

  const [selectedCells, setSelectedCells] = useState([]);
  const [subject, setSubject] = useState("");
  const [schedule, setSchedule] = useState({});

  // ★ 과목 목록 (subjects)
  //   -> [{ name: "프로그래밍", detail: { date, time, place, scope, studyProgress } }, ...]
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // examSchedule (시간표)
    const savedSchedule = JSON.parse(localStorage.getItem("examSchedule")) || {};
    setSchedule(savedSchedule);

    // subjects
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);

  // schedule, subjects 변경 시 로컬 스토리지 업데이트
  useEffect(() => {
    localStorage.setItem("examSchedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleCellClick = (day, time) => {
    const cell = { day, time };
    const foundIndex = selectedCells.findIndex(
      (sel) => sel.day === day && sel.time === time
    );
    if (foundIndex !== -1) {
      // 이미 선택된 셀 → 해제
      const updated = selectedCells.filter((_, i) => i !== foundIndex);
      setSelectedCells(updated);
    } else {
      // 새로 선택
      setSelectedCells([...selectedCells, cell]);
    }
  };

  // "저장" 버튼
  //  - 시간표(schedule)에 subject 입력
  //  - subjects 배열에도 (중복 없으면) 새 과목 추가
  const handleSave = () => {
    if (!subject.trim()) return;

    // 1) schedule 업데이트
    const updatedSchedule = { ...schedule };
    selectedCells.forEach((cell) => {
      if (!updatedSchedule[cell.day]) {
        updatedSchedule[cell.day] = {};
      }
      updatedSchedule[cell.day][cell.time] = subject;
    });
    setSchedule(updatedSchedule);

    // 2) subjects 배열 업데이트 (detail 기본값은 빈 객체)
    const already = subjects.find((s) => s.name === subject.trim());
    if (!already) {
      const newSubject = {
        name: subject.trim(),
        detail: {
          date: "",
          time: "",
          place: "",
          scope: "",
          studyProgress: "",
        },
      };
      setSubjects([...subjects, newSubject]);
    }

    // 선택/입력 초기화
    setSelectedCells([]);
    setSubject("");
  };

  // 특정 셀의 과목 삭제
  const handleDelete = (day, time) => {
    const updated = { ...schedule };
    if (updated[day] && updated[day][time]) {
      delete updated[day][time];
    }
    setSchedule(updated);
  };

  // "제출" 버튼 → 저장 후 /all-about-exam 이동
  const handleSubmit = () => {
    handleSave();
    navigate("/all-about-exam");
  };

  const days = ["월", "화", "수", "목", "금"];

  return (
    <div className={styles.examPage}>
      <div className={styles.tableContainer}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>시간</th>
              {days.map((d, i) => (
                <th key={i}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, row) => (
              <tr key={row}>
                <td>{`${9 + row}:00~${10 + row}:00`}</td>
                {days.map((d) => {
                  const isSelected = selectedCells.some(
                    (sel) => sel.day === d && sel.time === row
                  );
                  return (
                    <td
                      key={d}
                      onClick={() => handleCellClick(d, row)}
                      className={isSelected ? styles.selectedCell : styles.cell}
                      style={{ position: "relative" }}
                    >
                      {schedule[d]?.[row] || ""}
                      {schedule[d]?.[row] && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(d, row);
                          }}
                          className={styles.deleteButton}
                        >
                          X
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="과목을 입력하세요"
          className={styles.inputField}
        />
        <button onClick={handleSave} className={styles.saveButton}>
          저장
        </button>
        <button onClick={handleSubmit} className={styles.submitButton}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Exam;


