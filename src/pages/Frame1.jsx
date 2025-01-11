import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Frame1.module.css";

const Frame1 = () => {
  const navigate = useNavigate();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 백엔드로 데이터 전송
    try {
      const response = await axios.post("http://localhost:3001/register", {
        user_id: formData.user_id,
        password: formData.password,
        nickname: formData.nickname,
      });
      alert(response.data); // 백엔드 응답 메시지 표시
      navigate("/"); // 회원가입 후 메인 페이지로 이동
    } catch (error) {
      console.error(error);
      alert("회원가입 실패!");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>회원가입</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="user_id"
          placeholder="아이디"
          value={formData.user_id}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          가입하기
        </button>
      </form>
      <div className={styles.loginRedirect}>
        이미 회원이라면? <span className={styles.loginLink} onClick={() => navigate("/")}>로그인</span>
      </div>
    </div>
  );
};

export default Frame1;


