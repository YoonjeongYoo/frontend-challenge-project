var currentDate = new Date();
currentDate.setDate(1); // 현재 날짜를 현재 달의 1일로 설정
var calendarTable = document.createElement('table');
calendarTable.classList.add('calendar');
var calendarContainer = document.getElementById('calendar-container');
calendarContainer.appendChild(calendarTable);
var calendarHeader = document.createElement('div');
calendarHeader.id = 'calendar-header';
calendarContainer.insertBefore(calendarHeader, calendarTable);
var prevButton = document.createElement('button');
prevButton.textContent = '<';
prevButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});
calendarHeader.appendChild(prevButton);
var monthYear = document.createElement('h2');
monthYear.style.display = 'inline';
monthYear.style.margin = '0 10px';
calendarHeader.appendChild(monthYear);
var nextButton = document.createElement('button');
nextButton.textContent = '>';
nextButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});
calendarHeader.appendChild(nextButton);

// 메모 입력을 위한 모달 요소 생성
var memoModal = document.createElement('div');
memoModal.id = 'memo-modal';
memoModal.classList.add('memo-content');
document.body.appendChild(memoModal);

// 날짜 정보를 표시할 요소 생성
var clickedDateInfo = document.createElement('div');
clickedDateInfo.id = 'clicked-date-info';
memoModal.appendChild(clickedDateInfo);

// 메모 텍스트 영역 생성
var memoText = document.createElement('textarea');
memoText.id = 'memo-text';
memoText.rows = 6; // 크기를 더 크게 조절
memoModal.appendChild(memoText);

// 메모 저장 버튼 생성
var saveMemoButton = document.createElement('button');
saveMemoButton.id = 'save-memo';
saveMemoButton.textContent = '등록';
memoModal.appendChild(saveMemoButton);

updateCalendar();

function updateCalendar() {
    var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    var lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    calendarTable.innerHTML = '';
    var monthName = currentDate.toLocaleString('default', { month: 'long' });
    monthYear.textContent = currentDate.getFullYear() + '년 ' + monthName;
    var daysHeaderRow = document.createElement('tr');
    var daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    for (var i = 0; i < 7; i++) {
        var dayHeaderCell = document.createElement('th');
        dayHeaderCell.textContent = daysOfWeek[i];
        daysHeaderRow.appendChild(dayHeaderCell);
    }
    var calendarTableHead = document.createElement('thead');
    calendarTableHead.appendChild(daysHeaderRow);
    calendarTable.appendChild(calendarTableHead);

    var currentDay = new Date(firstDayOfMonth);
    var firstDayOfWeek = firstDayOfMonth.getDay();
    if (firstDayOfWeek !== 0) {
        currentDay.setDate(currentDay.getDate() - firstDayOfWeek);
    }

    var currentRow;
    while (currentDay <= lastDayOfMonth) {
        if (currentDay.getDay() === 0) {
            currentRow = calendarTable.insertRow();
        }
        var currentCell = currentRow.insertCell();
        var dayOfMonth = currentDay.getDate();

        // 셀 내부에 원 모양 아이콘을 추가하여 날짜를 표시합니다.
        var dateCircle = document.createElement('div');
        dateCircle.classList.add('date-circle');
        dateCircle.textContent = dayOfMonth;
        currentCell.appendChild(dateCircle);

        if (currentDay.getMonth() !== currentDate.getMonth()) {
            currentCell.classList.add('other-month');
        }
        currentCell.classList.add('calendar-cell');

        // 메모 아이콘을 추가합니다.
        var memoMarker = document.createElement('span');
        memoMarker.classList.add('memo-marker');
        var year = currentDay.getFullYear();
        var month = currentDay.getMonth() + 1;
        if (localStorage.getItem(year + '-' + month + '-' + dayOfMonth)) {
            memoMarker.textContent = '📝';
        } else {
            memoMarker.textContent = ''; // 메모가 없을 때는 아이콘을 표시하지 않습니다.
        }
        currentCell.appendChild(memoMarker);

        // 클릭 이벤트 등록
        (function(clickedDate) {
            currentCell.addEventListener('click', function() {
                var dayOfMonth = parseInt(this.textContent);
                var clickedYear = clickedDate.getFullYear();
                var clickedMonth = clickedDate.getMonth() + 1;

                // 클릭한 날짜 정보 표시
                clickedDateInfo.textContent = clickedYear + '년 ' + clickedMonth + '월 ' + dayOfMonth + '일';

                // 메모 입력을 위한 모달 표시
                memoModal.style.display = 'block';
                memoText.value = localStorage.getItem(clickedYear + '-' + clickedMonth + '-' + dayOfMonth) || '';

                // 등록 버튼 클릭 이벤트 핸들러
                saveMemoButton.onclick = function() {
                    var memoContent = memoText.value.trim();
                    localStorage.setItem(clickedYear + '-' + clickedMonth + '-' + dayOfMonth, memoContent);
                    memoModal.style.display = 'none';
                    updateCalendar();
                };
            });
        })(new Date(currentDay));

        currentDay.setDate(dayOfMonth + 1);
    }
}
