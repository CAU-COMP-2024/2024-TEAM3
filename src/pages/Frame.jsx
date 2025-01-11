import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기 추가
import axios from "axios"; // 백엔드와 통신을 위한 axios
import styles from "./Frame.module.css";

const Frame = () => {
  // 상태 관리: 이메일
  const [user_id, setUserId] = useState("");
  const navigate = useNavigate(); // 네비게이션 훅 추가

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  // 비밀번호 찾기 요청 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 API 호출
      const response = await axios.post("http://localhost:3001/find-password", {
        user_id,
      });

      // 응답 받은 비밀번호를 alert로 표시
      alert(`비밀번호: ${response.data.password}`);
      // 비밀번호를 표시한 후 로그인 페이지로 이동
      navigate("/"); // 로그인 페이지로 이동
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.status === 404) {
        alert("사용자를 찾을 수 없습니다. 아이디를 확인해주세요.");
      } else {
        console.error("서버 에러:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 이메일 입력 필드 */}
        <input
          type="text"
          name="user_id"
          placeholder="아이디"
          value={user_id}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        {/* 제출 버튼 */}
        <button type="submit" className={styles.submitButton}>
          비밀번호 찾기
        </button>
      </form>
    </div>
  );
};

export default Frame;


