document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');   

    // 로그인 폼 제출 이벤트 처리
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            // 로그인 API 호출
            const response = await fetch(
                'http://localhost:3000/auth/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (response.ok) {
                alert('로그인에 성공했습니다!');
                const data = await response.json();
                localStorage.setItem("login", true);
                localStorage.setItem("accessToken",data.result);
                window.location.href = '/'; // 로그인 성공 후 홈 페이지로 이동
            } else {
                alert('서버와 통신 중 오류가 발생했습니다.');
            }
        } catch (err) {
            console.error('로그인 요청 중 오류 발생:', err);
            alert('로그인 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });

    // 회원가입 버튼 이벤트 처리
    const signupButton = document.getElementById('signupButton');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = '/signup'; // 회원가입 페이지로 이동
        });
    }
});
