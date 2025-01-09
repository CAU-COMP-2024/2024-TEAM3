import { useState } from "react";
import axios from "axios"; // 백엔드와 통신을 위한 axios
import styles from "./Frame.module.css";

const Frame = () => {
  // 상태 관리: 이메일과 닉네임
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 비밀번호 찾기 요청 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 API 호출
      const response = await axios.post("http://localhost:3001/find-password", {
        email: formData.email,
        nickname: formData.nickname,
      });

      // 응답 받은 비밀번호를 alert로 표시
      alert(`비밀번호: ${response.data.password}`);
    } catch (error) {
      // 에러 처리
      if (error.response && error.response.status === 404) {
        alert("사용자를 찾을 수 없습니다. 이메일과 닉네임을 확인해주세요.");
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
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        {/* 닉네임 입력 필드 */}
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
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


