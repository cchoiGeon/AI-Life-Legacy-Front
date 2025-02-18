document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // 기본 제출 동작 방지

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // 비밀번호 일치 여부 확인
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:3000/auth/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            const result =  await response.json(); 
            localStorage.setItem('token', JSON.stringify(result.result));
            if (response.ok) {
                alert('회원가입이 완료되었습니다!');
                window.location.href = '../../public/home/home.html'; // 회원가입 후 로그인 페이지로 이동
            } else {
                const result = await response.json();
                alert(result.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 요청 중 오류 발생:', error);
            alert('회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
});
