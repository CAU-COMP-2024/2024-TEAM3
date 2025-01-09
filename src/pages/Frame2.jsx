import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Frame2.module.css";

const Frame2 = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/2");
  }, [navigate]);

  const onRectangleClick1 = useCallback(() => {
    navigate("/3");
  }, [navigate]);

  const onRectangleClick2 = useCallback(() => {
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
        <img className={styles.inner} alt="" src="/line-2.svg" />
      </div>
      <div className={styles.div3}>
        <div className={styles.rectangleDiv} />
        <img className={styles.lineIcon} alt="" src="/line-3.svg" />
        <div className={styles.div4}>이메일</div>
        <div className={styles.div5}>비밀번호</div>
      </div>
      <div className={styles.div6}>
        <div className={styles.child1} />
        <div className={styles.div7}>로그인</div>
      </div>
      <div className={styles.div8}>
        <div className={styles.div9}>
          회원가입 | 아이디 찾기 | 비밀번호 찾기
        </div>
        <div className={styles.child2} onClick={onRectangleClick} />
        <div className={styles.child3} onClick={onRectangleClick1} />
      </div>
      <div className={styles.child4} onClick={onRectangleClick2} />
    </div>
  );
};

export default Frame2;
