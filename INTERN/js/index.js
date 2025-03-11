/// Lấy các phần tử của form
const formRegister = document.getElementById('registerForm'); // Đổi từ register-form -> registerForm
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("confirm-password");

const userNameError = document.getElementById('userNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const rePasswordError = document.getElementById('rePasswordError');

const userLocal = JSON.parse(localStorage.getItem('users')) || [];

// Xử lý sự kiện submit form
formRegister.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn tải lại trang

    let isValid = true; // Biến kiểm tra hợp lệ

    // Kiểm tra tên đăng nhập
    if (!userName.value.trim()) {
        userNameError.style.display = 'block';
        isValid = false;
    } else {
        userNameError.style.display = 'none';
    }

    // Kiểm tra email
    if (!email.value.trim()) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Kiểm tra mật khẩu
    if (!password.value.trim()) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Kiểm tra xác nhận mật khẩu
    if (!rePassword.value.trim()) {
        rePasswordError.style.display = 'block';
        rePasswordError.innerHTML = 'Vui lòng nhập lại mật khẩu';
        isValid = false;
    } else if (password.value !== rePassword.value) {
        rePasswordError.style.display = 'block';
        rePasswordError.innerHTML = 'Mật khẩu không khớp';
        isValid = false;
    } else {
        rePasswordError.style.display = 'none';
    }

    // Nếu hợp lệ, lưu thông tin và chuyển sang trang đăng nhập
    if (isValid) {
        const user = {
            userId: Math.ceil(Math.random() * 1000000),
            userName: userName.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
        };

        // Lưu vào localStorage
        userLocal.push(user);
        localStorage.setItem("users", JSON.stringify(userLocal));

        // Chuyển hướng sang trang đăng nhập
        // window.location.href = "template.html";
    }
});


// Đăng nhập
const loginForm = document.getElementById("login-form")
const UserName = document.getElementById("userName");
const PassWord = document.getElementById("passWord");
const alertError = document.getElementById('alertError');


loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    //Validation dữ liệu đầu vào
    //Lấy dữ liệu từ Local về
    const userLocal = JSON.parse(localStorage.getItem('users')) || [];

    const findUser = userLocal.find((user) => user.userName === userName.value &&
         user.password === password.value)
    
    if(!findUser){
        alertError.style.display = 'block';
    }else{
        window.location.href = "users/homepage.html";

    }
});

    function showLogin() {
        document.getElementById('login-form').classList.remove('d-none');
    }

    function showRegister() {
        document.getElementById('register-form').classList.remove('d-none');
    }

    function hideForms() {
        document.getElementById('login-form').classList.add('d-none');
        document.getElementById('register-form').classList.add('d-none');
    }

    function switchToRegister() {
        document.getElementById('login-form').classList.add('d-none');
        document.getElementById('register-form').classList.remove('d-none');
    }

    function switchToLogin() {
        document.getElementById('register-form').classList.add('d-none');
        document.getElementById('login-form').classList.remove('d-none');
    }


// <!-- xử lí liên kết ví metamask -->


//  -- liên kết metamask -->
 function showWalletForm() {
    document.getElementById("wallet-form").classList.remove("d-none");  // Hiện form liên kết ví
    document.getElementById("register-form").classList.add("d-none");   // Ẩn form đăng ký
}

function hideWalletForm() {
    document.getElementById("wallet-form").classList.add("d-none"); // Ẩn form liên kết ví
}

// <!--Xử lý đăng nhập -->


    function handleLogin(event) {
        event.preventDefault(); // Ngăn trang load lại
    
        let username = document.getElementById("login-username").value.trim();
        let password = document.getElementById("login-password").value.trim();
    
        // Lấy tài khoản đã lưu trong Local Storage
        let savedAccount = localStorage.getItem("testAccount");
    
        if (savedAccount) {
            savedAccount = JSON.parse(savedAccount); // Chuyển JSON thành Object
    
            // Kiểm tra đăng nhập
            if (username === savedAccount.username && password === savedAccount.password) {
                showNotification("Đăng nhập thành công! Chuyển hướng...", "success");
    
                setTimeout(() => {
                    window.location.href = "../users/homepage.html"; // Chuyển trang
                }, 2000);
            } else {
                showNotification("Sai tên đăng nhập hoặc mật khẩu!", "error");
            }
        } else {
            showNotification("Không tìm thấy tài khoản!", "error");
        }
    }
    
    // Hiển thị thông báo
    function showNotification(message, type) {
        let notification = document.createElement("div");
        notification.className = "notification " + type;
        notification.innerText = message;
    
        document.body.appendChild(notification);
    
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // CSS cho thông báo
    let style = document.createElement("style");
    style.innerHTML = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        font-size: 16px;
        z-index: 1000;
    }
    .notification.error {
        background: #dc3545;
    }
    `;
    document.head.appendChild(style);
    



function handleRegister(event) {
    event.preventDefault(); // Ngừng việc gửi form mặc định

    // Lấy các giá trị từ các trường
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Kiểm tra các trường thông tin
    let isValid = true;
    
    // Kiểm tra tên đăng nhập
    if (!username) {
        document.getElementById("userNameError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("userNameError").style.display = "none";
    }

    // Kiểm tra email
    if (!email) {
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("emailError").style.display = "none";
    }

    // Kiểm tra mật khẩu
    if (!password) {
        document.getElementById("passwordError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("passwordError").style.display = "none";
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        document.getElementById("rePasswordError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("rePasswordError").style.display = "none";
    }

    // Nếu thông tin hợp lệ, chuyển sang trang đăng nhập
    if (isValid) {
        // Ẩn form đăng ký
        document.getElementById("register-form").classList.add("d-none");

        // Hiển thị form đăng nhập
        switchToLogin();
    }
}

function switchToLogin() {
    // Hiển thị form đăng nhập, ví dụ: form-login có thể được tạo riêng ở một nơi khác trong HTML
    document.getElementById("login-form").classList.remove("d-none");
}
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('href');

        console.log("Chuyển hướng đến:", page); // Debug kiểm tra

        if (page === '../users/maketest.html') {
            window.location.href = page; // Load lại trang nếu là maketest.html
        } else {
            loadContent(page); // Nếu là trang khác, tải bằng fetch()
        }
    });
});
