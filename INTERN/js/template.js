// function loadContent(page) {
//     console.log('Đang tải trang:', page);
//     fetch(page)
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById('content').innerHTML = html;
//             if (page === 'maketest.html') {
//                 attachSubmitQuizHandler();
//             } else if (page === 'quiz.html') {
//                 initFireworks();
//             } else if (page === 'result.html') {
//                 initMakeTest(); // Gọi hàm khởi tạo bài kiểm tra
//             }
//         });
// }
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => console.error('Lỗi tải nội dung:', error));
}

// Load trang chủ mặc định khi mở website
window.onload = function () {
    loadPage('homepage.html');
};

// Gọi hàm loadContent khi trang được tải lần đầu
loadContent('homepage.html');

// Gán sự kiện click cho các liên kết
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('href');
        loadContent(page);
    });
});

// Hàm gắn sự kiện click cho nút nộp bài
function attachSubmitQuizHandler() {
    const submitQuizButton = document.getElementById('submitQuiz');
    if (submitQuizButton) {
        submitQuizButton.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn nộp bài?')) {
                alert('Bài kiểm tra đã được nộp!');
                loadContent('result.html'); // Hoặc loadContent('congrats.html');
            } else {
                alert('Hành động nộp bài đã bị hủy!');
            }
        });
    }
}

function showUserInfo() {
    loadContent('personal.html'); 
}
function logout() {
    window.location.href = 'index.html'; // Chuyển hướng về trang index
}

function showResultModal() {
    // Giả sử bạn có dữ liệu kết quả từ bài kiểm tra
    const score = 8;
    const coins = 100;

    // Cập nhật nội dung modal
    document.getElementById('scoreResult').textContent = `Số điểm của bạn: ${score}/10`;
    document.getElementById('coinResult').textContent = `Số coin bạn nhận được: ${coins} TLCoin`;

    // Hiển thị modal
    var resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}
function initFireworks() {
    // Khởi tạo hiệu ứng pháo hoa
    const container = document.querySelector('.fireworks-container');
    const fireworks = new Fireworks(container, {
        acceleration: 1.2,
        friction: 0.96,
        gravity: 1.5,
        particles: 400,
        traceSpeed: 5,
        traceLength: 3,
        explosion: 5,
        mouse: {
            move: 1,
            click: false,
            max: 1
        }
    });

    // Bắn pháo hoa
    fireworks.start();
}
