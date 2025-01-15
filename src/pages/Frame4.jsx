import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Frame4.module.css";

const Frame4 = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/-things-to-do");
  }, [navigate]);

  const onRectangleClick1 = useCallback(() => {
    navigate("/-all-about-exam");
  }, [navigate]);

  const onRectangleClick2 = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onRectangleClick3 = useCallback(() => {
    navigate("/4");
  }, [navigate]);

  return (
    <div className={styles.div}>
      <div className={styles.child} />
      <div className={styles.item} />
      <div className={styles.inner} />
      <div className={styles.allHere}>ALL HERE</div>
      <div className={styles.div1}>오리어</div>
      <div className={styles.div2}>개인용</div>
      <div className={styles.div3}>팀플용</div>
      <div className={styles.thingsToDo}>Things to do</div>
      <div className={styles.thingsToDo}>Things to do</div>
      <div className={styles.div4}>프로젝트 1</div>
      <div className={styles.div5}>프로젝트 2</div>
      <div className={styles.div6}>계정</div>
      <div className={styles.div7}>설정</div>
      <div className={styles.allAboutExam}>All about exam</div>
      <div className={styles.div8}>과목 1</div>
      <div className={styles.div9}>역할 분담</div>
      <div className={styles.div10}>{`일정 `}</div>
      <div className={styles.div11}>회의</div>
      <div className={styles.div12}>문서</div>
      <div className={styles.div13}>과목 2</div>
      <div className={styles.div14}>과목 3</div>
      <div className={styles.lineDiv} />
      <div className={styles.child1} />
      <img className={styles.icon} alt="" src="/@2x.png" />
      <img className={styles.icon1} alt="" src="/1@2x.png" />
      <img className={styles.icon2} alt="" src="/-@2x.png" />
      <img className={styles.icon3} alt="" src="/2@2x.png" />
      <img className={styles.comp21} alt="" src="/comp-2--1@2x.png" />
      <div className={styles.rectangleDiv} onClick={onRectangleClick} />
      <div className={styles.child2} onClick={onRectangleClick} />
      <div className={styles.child3} onClick={onRectangleClick1} />
      <div className={styles.child4} onClick={onRectangleClick1} />
      <div className={styles.child5} onClick={onRectangleClick2} />
      <div className={styles.child6} onClick={onRectangleClick3} />
      <div className={styles.child7} />
      <div className={styles.mainContainer}>
        <span className={styles.main}>{`MAIN          개인용          `}</span>
        <span className={styles.span}>팀플용</span>
      </div>
      <div className={styles.div15}>팀플용</div>
      <div className={styles.div16}>다음 모임 예정일: 11/19</div>
      <div className={styles.child8} />
      <div className={styles.child9} />
      <div className={styles.child10} />
    </div>
  );
};

export default Frame4;
