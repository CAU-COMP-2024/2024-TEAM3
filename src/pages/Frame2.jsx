// import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Frame2.module.css";

// const Frame2 = () => {
//   const navigate = useNavigate();

//   const onRectangleClick = useCallback(() => {
//     navigate("/2");
//   }, [navigate]);

//   const onRectangleClick1 = useCallback(() => {
//     navigate("/3");
//   }, [navigate]);

//   const onRectangleClick2 = useCallback(() => {
//     navigate("/4");
//   }, [navigate]);

//   return (
//     <div className={styles.div}>
//       <div className={styles.div1}>
//         <div className={styles.child} />
//         <img className={styles.icon} alt="" src="/-1-1@2x.png" />
//       </div>
//       <div className={styles.div2}>
//         <div className={styles.item} />
//         <img className={styles.inner} alt="" src="/line-2.svg" />
//       </div>
//       <div className={styles.div3}>
//         <div className={styles.rectangleDiv} />
//         <img className={styles.lineIcon} alt="" src="/line-3.svg" />
//         <div className={styles.div4}>아이디</div>
//         <div className={styles.div5}>비밀번호</div>
//       </div>
//       <div className={styles.div6}>
//         <div className={styles.child1} />
//         <div className={styles.div7}>로그인</div>
//       </div>
//       <div className={styles.div8}>
//         <div className={styles.div9}>
//           회원가입 | 아이디 찾기 | 비밀번호 찾기
//         </div>
//         <div className={styles.child2} onClick={onRectangleClick} />
//         <div className={styles.child3} onClick={onRectangleClick1} />
//       </div>
//       <div className={styles.child4} onClick={onRectangleClick2} />
//     </div>
//   );
// };

// export default Frame2;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Frame2.module.css";

const Frame2 = () => {
  const navigate = useNavigate();

  // 상태 관리: 아이디와 비밀번호
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 로그인 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 요청:", formData);

    // 로그인 성공 시 /home으로 이동
    navigate("/home", { state: { user_id: formData.user_id } });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로그인</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          placeholder="아이디"
          value={formData.user_id}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          로그인
        </button>
      </form>
      <div className={styles.links}>
        <span onClick={() => navigate("/2")}>회원가입</span> |{" "}
        <span onClick={() => navigate("/3")}>아이디 찾기</span> |{" "}
        <span onClick={() => navigate("/3")}>비밀번호 찾기</span>
      </div>
    </div>
  );
};

export default Frame2;
