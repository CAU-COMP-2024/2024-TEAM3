
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 사용하여 백엔드와 통신
import styles from "./Frame2.module.css";

const Frame2 = () => {
  const navigate = useNavigate();

  // 상태 관리: 아이디와 비밀번호
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });
  // 상태 관리: 에러 메시지
  const [errorMessage, setErrorMessage] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 로그인 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 백엔드에 로그인 요청
      const response = await axios.post("http://localhost:3001/login", formData);

      // 로그인 성공 시 메인 페이지로 이동
      if (response.data.success) {
        // 닉네임 저장 (예: localStorage나 state에 저장)
        sessionStorage.setItem("nickname", response.data.nickname);

        navigate("/home", { state: { user_id: formData.user_id } });
      } else {
        // 로그인 실패 시 에러 메시지 설정
        setErrorMessage(response.data.message || "아이디 또는 비밀번호가 일치하지 않습니다.");

      }
    } catch (error) {
      console.error("로그인 요청 중 에러 발생:", error);
      setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 특정 버튼 클릭 시 메인 페이지로 이동
  const onRectangleClick2 = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.page}>
      {/* 고정된 상단바 */}
      <div className={styles.header}>오리어 로고(추가예정)</div>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_id"
            placeholder="아이디"
            value={formData.user_id}
            onChange={handleChange}
            className={styles.input1}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className={styles.input2}
          />
          <div class="line"></div>
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.links}>
          <span onClick={() => navigate("/2")}>회원가입</span> |{" "}
          <span onClick={() => navigate("/3")}>아이디 찾기</span> |{" "}
          <span onClick={() => navigate("/3")}>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};

export default Frame2;
