document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = localStorage.getItem('login');
    if(!isLoggedIn){
        alert("로그인이 필요합니다");
        window.location.href = "/signin";
    }
    
    if (!accessToken) {
        console.error('Access token is missing');
        return;
    }

    const cardContainer = document.querySelector('.card-container');
    const listModal = document.getElementById('list-modal');
    const editModal = document.getElementById('edit-modal');
    const listModalTitle = document.getElementById('list-modal-title');
    const questionList = document.getElementById('question-list');
    const closeListModal = document.getElementById('close-list-modal');
    const editModalTitle = document.getElementById('edit-modal-title');
    const editTextarea = document.getElementById('edit-textarea');
    const closeEditModal = document.getElementById('close-edit-modal');
    const saveEditModal = document.getElementById('save-edit-modal');

    let questionsData = {};

    async function fetchQuestions() {
        try {
            const response = await fetch('http://localhost:3000/user/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            if (data.statusCode !== 200) throw new Error(`API error! Message: ${data.message}`);

            questionsData = data.result.reduce((acc, item) => {
                const category = item.content.text;
                if (!acc[category]) acc[category] = [];
                acc[category].push({
                    question: item.question.text,
                    response: item.response,
                    id: item.id
                });
                return acc;
            }, {});
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    await fetchQuestions();

    cardContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (!card) return;

        const sectionTitle = card.dataset.title;
        const sectionQuestions = questionsData[sectionTitle] || [];

        listModalTitle.textContent = sectionTitle;
        questionList.innerHTML = '';

        sectionQuestions.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.question;

            li.addEventListener('click', async () => {
                const imageUrl = await fetchImage(item.id);
                openEditModal(sectionTitle, item.question, item.response, imageUrl);
            });
            questionList.appendChild(li);
        });

        listModal.style.display = 'block';
        document.querySelector('.fade').style.display = 'block';
    });

    async function fetchImage(postId) {
        try {
            const response = await fetch(`http://localhost:3000/post/confirm/${postId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                return data.data?.photoUrl || null;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
        return null;
    }

    function openEditModal(title, question, response, imageUrl) {
        listModal.style.display = 'none';
        editModal.style.display = 'block';

        editModalTitle.textContent = title;
        editTextarea.value = response;
        editTextarea.placeholder = question;

        const modalBody = editModal.querySelector('.modal-body');
        modalBody.innerHTML = '';

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${title} 관련 이미지`;
            img.style.width = '100%';
            modalBody.appendChild(img);
        }

        modalBody.appendChild(editTextarea);
    }

    closeListModal.addEventListener('click', () => {
        listModal.style.display = 'none';
        document.querySelector('.fade').style.display = 'none';
    });

    closeEditModal.addEventListener('click', () => {
        editModal.style.display = 'none';
        document.querySelector('.fade').style.display = 'none';
    });

    saveEditModal.addEventListener('click', () => {
        console.log('저장된 내용:', editTextarea.value);
        editModal.style.display = 'none';
        document.querySelector('.fade').style.display = 'none';
    });
});
