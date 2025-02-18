document.getElementById('gotomain').addEventListener("click", async () => {
    const button = document.getElementById('gotomain');
    const content = document.getElementById('content');
    const statusText = document.getElementById('status-text');

    // 버튼 비활성화 및 텍스트 업데이트
    button.disabled = true;
    button.textContent = "처리 중..."; // 버튼 텍스트 변경
    statusText.innerHTML = "이미지를 생성 중입니다.<br>잠시만 기다려 주세요!";
    content.innerHTML = `
        <div class="loading-spinner"></div>
        <p>이미지를 생성 중입니다. 이 작업은 최대 30분이 걸릴 수 있습니다.</p>
    `;

    // 토큰 설정
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjBjNDE5Y2ItOTRkMy00ZjU3LTgwOGMtMTdiZDQ2MDM3NzA4IiwiaWF0IjoxNzM3MjI4Njk3LCJleHAiOjE3MzcyMzIyOTd9.0Vw-onFXCtL3pLA53sHvJ7X1cQozUwRHp92dBTzg7Mk";

    try {
        const response = await fetch('http://localhost:3000/post/final', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            alert('이미지 생성을 완료했습니다!');
            window.location.href = '/myprofile'; // 페이지 이동
        } else {
            alert('생성을 완료했지만, 문제가 발생했습니다.');
            button.disabled = false; // 실패 시 버튼 활성화
            button.textContent = "확인";
        }
    } catch (error) {
        console.error('요청 중 오류 발생:', error);
        alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        button.disabled = false; // 실패 시 버튼 활성화
        button.textContent = "확인";
    }
});
