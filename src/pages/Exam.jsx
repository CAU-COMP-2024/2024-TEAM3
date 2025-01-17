import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Exam.module.css";

const Exam = () => {
  const navigate = useNavigate();
  const [selectedCells, setSelectedCells] = useState([]);
  const [subject, setSubject] = useState("");
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = JSON.parse(localStorage.getItem("examSchedule"));
    return savedSchedule || {};
  });

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

  const handleSave = () => {
    const updatedSchedule = { ...schedule };
    selectedCells.forEach((cell) => {
      if (!updatedSchedule[cell.day]) {
        updatedSchedule[cell.day] = {};
      }
      updatedSchedule[cell.day][cell.time] = subject;
    });

    setSchedule(updatedSchedule);
    localStorage.setItem("examSchedule", JSON.stringify(updatedSchedule));
    setSelectedCells([]); // 선택 초기화
    setSubject(""); // 입력 필드 초기화
  };

  const handleSubmit = () => {
    handleSave();
    navigate("/allaboutexam");
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
                    {schedule[day]?.[i] || ""}
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
