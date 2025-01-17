import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Exam.module.css";

const Exam = () => {
  const navigate = useNavigate();
  const [selectedCells, setSelectedCells] = useState([]);
  const [subject, setSubject] = useState("");
  const [schedule, setSchedule] = useState({});

  // 컴포넌트 마운트 시 로컬 스토리지에서 기존 시험 일정 불러오기
  useEffect(() => {
    const savedSchedule = JSON.parse(localStorage.getItem("examSchedule"));
    if (savedSchedule) {
      setSchedule(savedSchedule);
    }
  }, []);

  // schedule 상태가 바뀔 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("examSchedule", JSON.stringify(schedule));
  }, [schedule]);

  // 셀 클릭(선택) 핸들러
  const handleCellClick = (day, time) => {
    const cell = { day, time };
    const cellIndex = selectedCells.findIndex(
      (selected) => selected.day === day && selected.time === time
    );

    if (cellIndex !== -1) {
      const updatedCells = selectedCells.filter((_, index) => index !== cellIndex);
      setSelectedCells(updatedCells);
    } else {
      setSelectedCells([...selectedCells, cell]);
    }
  };

  // 저장 버튼 핸들러
  const handleSave = () => {
    const updatedSchedule = { ...schedule };
    selectedCells.forEach((cell) => {
      if (!updatedSchedule[cell.day]) {
        updatedSchedule[cell.day] = {};
      }
      updatedSchedule[cell.day][cell.time] = subject;
    });

    setSchedule(updatedSchedule);
    setSelectedCells([]); // 선택 초기화
    setSubject(""); // 입력 필드 초기화
  };

  // 삭제 버튼 핸들러 (특정 셀의 과목을 삭제)
  const handleDelete = (day, time) => {
    const updatedSchedule = { ...schedule };
    if (updatedSchedule[day] && updatedSchedule[day][time]) {
      delete updatedSchedule[day][time];
    }
    setSchedule(updatedSchedule);
  };

  // 제출 버튼 핸들러
  const handleSubmit = () => {
    handleSave();
    navigate("/all-about-exam");
  };

  return (
    <div className={styles.examPage}>
      <div className={styles.tableContainer}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>시간</th>
              {["월", "화", "수", "목", "금"].map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <td style={{ fontSize: "1.8em", padding: "30px" }}>{`${9 + i}:00~${10 + i}:00`}</td>
                {["월", "화", "수", "목", "금"].map((day) => (
                  <td
                    key={day}
                    className={
                      selectedCells.some(
                        (selected) => selected.day === day && selected.time === i
                      )
                        ? styles.selectedCell
                        : styles.cell
                    }
                    onClick={() => handleCellClick(day, i)}
                    style={{ width: "100px", height: "100px", position: "relative" }}
                  >
                    {/* 과목 표시 */}
                    {schedule[day]?.[i] || ""}
                    {/* 삭제 버튼 (과목이 있을 때만 표시) */}
                    {schedule[day]?.[i] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 셀 클릭 이벤트가 중복으로 발생하지 않도록 버블링 막기
                          handleDelete(day, i);
                        }}
                        className={styles.deleteButton}
                      >
                        X
                      </button>
                    )}
                  </td>
                ))}
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
