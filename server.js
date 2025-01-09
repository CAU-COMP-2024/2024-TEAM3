const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
    const { email, password, nickname } = req.body;


    console.log('Request Data:', req.body); // 요청 데이터를 로그로 출력

    if (!password || !email || !nickname) {
        return res.status(400).send('모든 필드를 입력해주세요.');
    }


    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)';
    db.query(sql, [email, hashedPassword, nickname], (err, result) => {
        if (err) {
            console.error('MySQL Error:', err);
            res.status(500).send('회원가입 실패!');
        }
        res.status(200).send('회원가입 성공!');
        
    });
});

// 서버 실행
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
