// 타이머 관련 변수
let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;

// 시작 버튼 클릭 시 실행되는 함수
function start() {
    // 입력된 시간 가져오기
    hours = parseInt(document.getElementById("hours").value) || 0;
    minutes = parseInt(document.getElementById("minutes").value) || 0;
    seconds = parseInt(document.getElementById("seconds").value) || 0;

    // 숨김 처리
    document.querySelector(".insertTime").style.display = "none";

    // 타이머 시작
    timerInterval = setInterval(updateTimer, 1000);
}

// 타이머 업데이트 함수
function updateTimer() {
    // 시간 감소
    if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timerInterval); // 타이머 중지
        alert("타이머 종료!"); // 타이머 종료 메시지 표시
        document.querySelector(".insertTime").style.display = "block"; // 시, 분, 초 입력 영역 다시 표시
    } else {
        if (seconds === 0) {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
        } else {
            seconds--;
        }
    }

    // 시간을 시:분:초 형식으로 표시
    document.getElementById("display").innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// 시간 형식을 2자리로 맞추는 함수
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// 정지 버튼 클릭 시 실행되는 함수
function stop() {
    clearInterval(timerInterval); // 타이머 중지
}

// 초기화 버튼 클릭 시 실행되는 함수
function reset() {
    clearInterval(timerInterval); // 타이머 중지
    hours = 0;
    minutes = 0;
    seconds = 0;
    document.getElementById("display").innerText = "00:00:00"; // 타이머 디스플레이 초기화

    // 입력 영역 다시 표시
    document.querySelector(".insertTime").style.display = "block";
}
