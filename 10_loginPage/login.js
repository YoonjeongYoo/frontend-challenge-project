function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMsg = document.getElementById('error-msg');

    // 임의의 ID와 PW
    var validUsername = "user";
    var validPassword = "password";

    if (username === "" || password === "") {
        errorMsg.textContent = "ID 또는 PW를 입력하세요.";
    } else if (username !== validUsername || password !== validPassword) {
        errorMsg.textContent = "ID 혹은 PW가 잘못되었습니다.";
    } else {
        alert("로그인이 되었습니다");
    }
}
