const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
// const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ggun2386~~', // MySQL 비밀번호
    database: 'user_database',  // 데이터베이스 이름
    port: 3306 // MySQL이 실행 중인 포트 번호
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// 회원가입 엔드포인트
app.post('/register', async (req, res) => {
    const { user_id, password, nickname } = req.body;

    console.log('Request Data:', req.body); // 요청 데이터를 로그로 출력

    if (!password || !user_id || !nickname) {
        return res.status(400).send('모든 필드를 입력해주세요.');
    }

    // // 비밀번호 암호화
    // const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (user_id, password, nickname) VALUES (?, ?, ?)';
    db.query(sql, [user_id, password, nickname], (err, result) => {
        if (err) {
            console.error('MySQL Error:', err);
            res.status(500).send('회원가입 실패!');
        } else {
            res.status(200).send('회원가입 성공!');
        }
    });
});

// 비밀번호 찾기 엔드포인트 추가
app.post('/find-password', (req, res) => {
    const { user_id } = req.body; // 요청에서 이메일 추출

    // 입력값 검증
    if (!user_id) {
        return res.status(400).send('아이디를 입력해주세요.');
    }

    const sql = 'SELECT password FROM users WHERE user_id = ?'; // 이메일로만 조회
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error('MySQL Error:', err); // 에러 로그 출력
            return res.status(500).send('서버 에러가 발생했습니다.');
        }

        if (result.length === 0) {
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }

        // 비밀번호 반환
        res.status(200).json({ password: result[0].password }); // 비밀번호를 JSON 형태로 반환
    });
});
// 로그인 엔드포인트
app.post("/login", (req, res) => {
    const { user_id, password } = req.body;
  
    // 데이터베이스에서 사용자 정보 확인
    const sql = "SELECT * FROM users WHERE user_id = ? AND password = ?";
    db.query(sql, [user_id, password], (err, result) => {
      if (err) {
        console.error("데이터베이스 에러:", err);
        return res.status(500).json({ success: false, message: "서버 에러" });
      }
  
      if (result.length > 0) {
        // 로그인 성공
        res.json({ success: true });
      } else {
        // 로그인 실패
        res.json({ success: false, message: "아이디 또는 비밀번호 불일치" });
      }
    });
  });
// 서버 실행
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});


