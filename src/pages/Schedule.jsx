import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Schedule.module.css";

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 날짜 가져오기
  const query = new URLSearchParams(location.search);
  const selectedDate = query.get("date");

  // 상태 초기화
  const [schedule, setSchedule] = useState(Array.from({ length: 17 }, () => ""));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(""); // 할 일 입력값
  const [newScheduleNote, setNewScheduleNote] = useState(""); // 일정 입력값
  const [selectedTimes, setSelectedTimes] = useState([]); // 체크된 시간들

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    if (selectedDate) {
      const savedData = JSON.parse(localStorage.getItem(selectedDate)) || {};
      setSchedule(savedData.schedule || Array.from({ length: 17 }, () => ""));
      setTasks(savedData.tasks || []);
    }
  }, [selectedDate]);

  // 시간 체크 핸들러
  const handleTimeClick = (rowIndex) => {
    if (selectedTimes.includes(rowIndex)) {
      setSelectedTimes(selectedTimes.filter((time) => time !== rowIndex));
    } else {
      setSelectedTimes([...selectedTimes, rowIndex]);
    }
  };

  // 새로운 일정 추가 핸들러
  const handleScheduleAdd = () => {
    if (newScheduleNote.trim() && selectedTimes.length > 0) {
      const updatedSchedule = [...schedule];
      selectedTimes.forEach((time) => {
        updatedSchedule[time] = newScheduleNote;
      });
      setSchedule(updatedSchedule);
      setNewScheduleNote(""); // 입력 필드 초기화
      setSelectedTimes([]); // 선택 시간 초기화
    }
  };

  // 일정 삭제 핸들러
  const handleScheduleDelete = (rowIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[rowIndex] = "";
    setSchedule(updatedSchedule);
  };

  // 새로운 할 일 추가
  const handleTaskAdd = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  // 할 일 삭제 핸들러
  const handleTaskDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // 제출 버튼 클릭 핸들러
  const handleSubmit = () => {
    const savedData = {
      date: selectedDate,
      schedule,
      tasks,
    };
    localStorage.setItem(selectedDate, JSON.stringify(savedData));
    alert("일정이 저장되었습니다!");
    navigate("/things-to-do");
  };

  if (!selectedDate) {
    return <div>날짜를 선택해주세요.</div>;
  }

  return (
    <div className={styles.schedulePage}>
      {/* 좌측 일정 테이블 */}
      <div className={styles.scheduleContainer}>
        <h2>일정 테이블 - {selectedDate}</h2>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>시간</th>
              <th>일정</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 17 }, (_, i) => (
              <tr key={i}>
                <td
                  className={
                    selectedTimes.includes(i) ? styles.checkedCell : styles.cell
                  }
                  onClick={() => handleTimeClick(i)}
                >
                  {`${7 + i}:00~${8 + i}:00`}
                </td>
                <td>
                  {schedule[i]}
                  {schedule[i] && (
                    <button
                      onClick={() => handleScheduleDelete(i)}
                      className={styles.deleteButton}
                    >
                      X
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 새로운 일정 입력 및 저장 */}
        <div className={styles.scheduleInputContainer}>
          <input
            type="text"
            value={newScheduleNote}
            onChange={(e) => setNewScheduleNote(e.target.value)}
            placeholder="새 일정을 입력하세요..."
            className={styles.taskInput}
          />
          <button onClick={handleScheduleAdd} className={styles.addButton}>
            저장
          </button>
        </div>
      </div>

      {/* 우측 할 일 목록 */}
      <div className={styles.taskContainer}>
        <h2>할 일 목록</h2>
        <div className={styles.taskList}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskItem}>
              <span>{task}</span>
              <button
                onClick={() => handleTaskDelete(index)}
                className={styles.deleteButton}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className={styles.taskInputContainer}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="새 할 일을 입력하세요..."
            className={styles.taskInput}
          />
          <button onClick={handleTaskAdd} className={styles.addButton}>
            저장
          </button>
        </div>
        <button onClick={handleSubmit} className={styles.submitButton}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Schedule;
