/* DOM 요소 연결 */
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');    // 리스트 배열로 반환

const operatorRegex = /[+\-*/]/;
const numberRegex = /[0-9.]/;

/* input 태그 Screen에 숫자 또는 연산자를 추가하는 함수 */
function appendToScreen(value) {
    screen.value += value;
}

/* Screen 초기화 함수 */
function clearScreen() {
    screen.value = '';
}

/* 연산 수행 함수 */
function calculate(operator, numbers) {
    /* numbers 배열 데이터를 정수화 */
    const [num1, num2] = numbers.map(Number);
    /* numbers에 배열로 된 데이터를 삽입 (숫자와 연산자)*/

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error';
        default:
            return null;
    }
}

/* 버튼 클릭 이벤트 처리 */
function handleButtonClick(event) {
    /* 새로고침 방지 */
    event.preventDefault();
    const buttonText = event.target.innerText;

    if (numberRegex.test(buttonText)) {
        /* 숫자 버튼 클릭 시 */
        appendToScreen(buttonText);
    } else if (operatorRegex.test(buttonText)) {
        /* 연산자 버튼 클릭 시 */
        if (screen.value && !operatorRegex.test(screen.value.slice(-1))) {
            appendToScreen(buttonText);
        } 
    } 
}

/* 모든 버튼에 클릭 이벤트 리스너 추가 */
function initializeButtonListeners() {
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
}

/* = 버튼 클릭 시 계산 수행 */
function handleResultClick() {
    const screenValue = screen.value;

    if (screenValue.includes('+')) {
        const [num1, num2] = screenValue.split('+');
        screen.value = calculate('+', [num1, num2]);
    } else if (screenValue.includes('-')) {
        const [num1, num2] = screenValue.split('-');
        screen.value = calculate('-', [num1, num2]);
    } else if (screenValue.includes('*')) {
        const [num1, num2] = screenValue.split('*');
        screen.value = calculate('*', [num1, num2]);
    } else if (screenValue.includes('/')) {
        const [num1, num2] = screenValue.split('/');
        screen.value = calculate('/', [num1, num2]);
    }
}

/* 초기화 함수 */
document.getElementById('resetButton').addEventListener('click', function() {
    clearScreen();
});

/* = 버튼 클릭 이벤트 리스너 추가 */
document.getElementById('result').addEventListener('click', handleResultClick);

/* 버튼 리스너 초기화 */
initializeButtonListeners();