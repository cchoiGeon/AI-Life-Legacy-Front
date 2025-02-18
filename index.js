const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

// 루트 경로 ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home/home.html'));
});

// 로그인 페이지 ('/login')
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup/signup.html'));
});

app.get('/mypage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mypage/mypage.html'));
});

app.get('/myprofile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'myprofile/myprofile.html'));
});

app.get('/posts/1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'posts/posts1.html'));
});

app.get('/finish', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'finish/finish.html'));
});
// 서버 실행
app.listen(PORT, () => {
    console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
