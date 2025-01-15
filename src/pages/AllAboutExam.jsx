import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllAboutExam.module.css";

const AllAboutExam = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/things-to-do");
  }, [navigate]);

  const onRectangleClick1 = useCallback(() => {
    navigate("/1");
  }, [navigate]);

  const onRectangleClick2 = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onRectangleClick3 = useCallback(() => {
    navigate("/4");
  }, [navigate]);

  return (
    <div className={styles.allAboutExam}>
      <div className={styles.allAboutExamChild} onClick={onRectangleClick} />
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
      <div className={styles.allAboutExamChild2} onClick={onRectangleClick1} />
      <div className={styles.allAboutExamChild3} onClick={onRectangleClick1} />
      <div className={styles.allAboutExamChild4} onClick={onRectangleClick} />
      <div className={styles.allAboutExamChild5} onClick={onRectangleClick2} />
      <div className={styles.allAboutExamChild6} onClick={onRectangleClick3} />
      <div className={styles.allAboutExamChild7} />
      <div className={styles.mainContainer}>
        <span className={styles.main}>{`MAIN          `}</span>
        <span className={styles.span}>개인용</span>
        <span className={styles.main}> 팀플용</span>
      </div>
      <div className={styles.allAboutExam2}>개인용 - All about exam</div>
      <div className={styles.comp}>오늘의 주요일정: COMP 프로젝트 발표</div>
      <div className={styles.allAboutExamChild8} />
      <div className={styles.allAboutExamChild9} />
      <div className={styles.allAboutExamChild10} />
    </div>
  );
};

export default AllAboutExam;
