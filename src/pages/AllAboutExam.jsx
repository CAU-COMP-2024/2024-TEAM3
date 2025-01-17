import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllAboutExam.module.css";

const AllAboutExam = () => {
  const navigate = useNavigate();
  const [weekDates, setWeekDates] = useState([]);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    // 현재 주차 계산
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ...
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // 월요일

    const week = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const days = ["월", "화", "수", "목", "금"];
      return `${date.getMonth() + 1}/${date.getDate()} (${days[i]})`;
    });

    setWeekDates(week);

    // 로컬 스토리지에서 데이터 로드
    const savedSchedule = JSON.parse(localStorage.getItem("examSchedule")) || {};
    setSchedule(savedSchedule);
  }, []);

  const handleAddClick = () => {
    navigate("/exam");
  };

  return (
    <div className={styles.allAboutExam}>
      <div className={styles.allAboutExamChild} onClick={() => navigate("/things-to-do")} />
      <div className={styles.allAboutExamItem} />
      <div className={styles.allAboutExamInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.allHere}>ALL HERE</div>
      <div className={styles.div}>오리어</div>
      <div className={styles.div1}>개인용</div>
      <div className={styles.div2}>팀플용</div>
      <div className={styles.thingsToDo}>Things to do</div>
      <div className={styles.thingsToDo}>Things to do</div>
      <div className={styles.div3}>프로젝트 1</div>
      <div className={styles.div4}>프로젝트 2</div>
      <div className={styles.div5}>계정</div>
      <div className={styles.div6}>설정</div>
      <div className={styles.allAboutExam1}>All about exam</div>
      <div className={styles.div7}>과목 1</div>
      <div className={styles.div8}>역할 분담</div>
      <div className={styles.div9}>{`일정 `}</div>
      <div className={styles.div10}>회의</div>
      <div className={styles.div11}>문서</div>
      <div className={styles.div12}>과목 2</div>
      <div className={styles.div13}>과목 3</div>
      <div className={styles.lineDiv} />
      <div className={styles.allAboutExamChild1} />
      <img className={styles.icon} alt="" src="/@2x.png" />
      <img className={styles.icon1} alt="" src="/1@2x.png" />
      <img className={styles.icon2} alt="" src="/-@2x.png" />
      <img className={styles.icon3} alt="" src="/2@2x.png" />
      <img className={styles.comp21} alt="" src="/comp-2--1@2x.png" />
      <div className={styles.allAboutExamChild2} onClick={() => navigate("/1")} />
      <div className={styles.allAboutExamChild3} onClick={() => navigate("/1")} />
      <div className={styles.allAboutExamChild4} onClick={() => navigate("/things-to-do")} />
      <div className={styles.allAboutExamChild5} onClick={() => navigate("/")} />
      <div className={styles.allAboutExamChild6} onClick={() => navigate("/4")} />
      <div className={styles.allAboutExamChild7} />
      <div className={styles.mainContainer}>
        <span className={styles.main}>{`MAIN          `}</span>
        <span className={styles.span}>개인용</span>
        <span className={styles.main}> 팀플용</span>
      </div>
      <div className={styles.allAboutExam2}>개인용 - All about exam</div>
      <div className={styles.comp}>오늘의 주요일정: COMP 프로젝트 발표</div>
      <div className={styles.allAboutExamChild8}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr>
              <th>시간</th>
              {weekDates.map((date, index) => (
                <th key={index}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <td>{`${9 + i}:00~${10 + i}:00`}</td>
                {weekDates.map((date, j) => {
                  const dayKey = date.split(" ")[0]; // "1/17" 형태로 키 변환
                  return (
                    <td key={j} className={styles.cell}>
                      {schedule[dayKey]?.[i] || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className={styles.addButton} onClick={handleAddClick}>+ 추가</button>
      <div className={styles.allAboutExamChild9} />
      <div className={styles.allAboutExamChild10} />
    </div>
  );
};

export default AllAboutExam;
