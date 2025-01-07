import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Frame1.module.css";

const Frame1 = () => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/");
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
        <div className={styles.div3}>비밀번호</div>
      </div>
      <div className={styles.div6}>
        <img className={styles.rectangleIcon} alt="" src="/rectangle-8.svg" />
        <div className={styles.div7}>비밀번호 확인</div>
      </div>
      <div className={styles.div8}>
        <img className={styles.child1} alt="" src="/rectangle-9.svg" />
        <div className={styles.div3}>이메일</div>
        <div className={styles.div10}>닉네임</div>
      </div>
      <img className={styles.icon1} alt="" src="/3.svg" />
      <img className={styles.icon2} alt="" src="/31.svg" />
      <div className={styles.div11}>
        <div className={styles.rectangleDiv} />
        <div className={styles.div12}>가입하기</div>
      </div>
      <div className={styles.div13}>
        <div className={styles.div14}>
          {`이미 회원이라면?        `}
          <span className={styles.span}>로그인</span>
        </div>
        <div className={styles.child2} onClick={onRectangleClick} />
      </div>
      <div className={styles.div15}>회원가입</div>
      <div className={styles.child3} onClick={onRectangleClick1} />
    </div>
  );
};

export default Frame1;
