import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Frame.module.css";

const Frame = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/2");
  }, [navigate]);

  const onRectangleClick1 = useCallback(() => {
    navigate("/4");
  }, [navigate]);

  return (
    <div className={styles.div}>
      <div className={styles.div1}>
        <div className={styles.child} />
        <img className={styles.icon} alt="" src="/-1-1@2x.png" />
      </div>
      <div className={styles.div2}>
        <div className={styles.item} />
        <div className={styles.div3}>{`아이디 `}</div>
      </div>
      <div className={styles.div4}>
        <div className={styles.item} />
        <div className={styles.div3}>이메일</div>
      </div>
      <div className={styles.div6}>
        <img className={styles.rectangleIcon} alt="" src="/rectangle-8.svg" />
        <div className={styles.div7}>닉네임</div>
      </div>
      <div className={styles.div8}>
        <div className={styles.rectangleDiv} />
        <div className={styles.div9}>비밀번호 찾기</div>
      </div>
      <div className={styles.div10}>
        <div className={styles.div11}>
          {`회원이 아니라면?        `}
          <span className={styles.span}>회원가입</span>
        </div>
        <div className={styles.child1} onClick={onRectangleClick} />
      </div>
      <div className={styles.div12}>비밀번호 찾기</div>
      <div className={styles.child2} onClick={onRectangleClick1} />
    </div>
  );
};

export default Frame;
