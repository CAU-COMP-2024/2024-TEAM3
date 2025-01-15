import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Frame1 from "./pages/Frame1";
import Frame from "./pages/Frame";
import Frame2 from "./pages/Frame2";
import Frame3 from "./pages/Frame3";

import Home from "./pages/Home"; // 메인 페이지
import Personal from "./pages/Personal"; // 개인용 페이지 추가
import Team from "./pages/Team"; // 팀플용 페이지 추가
import ThingsToDo from "./pages/ThingsToDo"; // 새로 생성할 컴포넌트
import AllAboutExam from "./pages/AllAboutExam"; // 새로 생성할 컴포넌트
import Schedule from "./pages/Schedule";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "로그인";
        metaDescription = "로그인 페이지입니다.";
        break;
      case "/2":
        title = "회원가입";
        metaDescription = "회원가입 페이지입니다.";
        break;
      case "/3":
        title = "비밀번호 찾기";
        metaDescription = "비밀번호 찾기 페이지입니다.";
        break;
      case "/home":
        title = "메인 페이지";
        metaDescription = "메인 페이지입니다.";
        break;
      default:
        title = "ALL HERE";
        metaDescription = "ALL HERE에 오신 것을 환영합니다.";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Frame2 />} />
      <Route path="/2" element={<Frame1 />} />
      <Route path="/3" element={<Frame />} />
      <Route path="/4" element={<Frame2 />} />
      <Route path="/home" element={<Home />} />
      <Route path="/personal" element={<Personal />} /> {/* 개인용 페이지 라우트 */}
      <Route path="/team" element={<Team />} /> {/* 팀플용 페이지 라우트 */}
      <Route path="/things-to-do" element={<ThingsToDo />} />
      <Route path="/all-about-exam" element={<AllAboutExam />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
}
export default App;
