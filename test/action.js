document.addEventListener('DOMContentLoaded', () => {
    const checkConditions = () => {
        const result1 = document.getElementById('result1').innerText;
        const result2 = document.getElementById('result2').innerText;
        const result3 = document.getElementById('result3').innerText;

        if (result1.includes('True') && result2.includes('True') && result3.includes('True')) {
            console.log('All conditions met! Performing action...');
            // 여기에 필요한 액션 추가
        }
    };

    setInterval(checkConditions, 500); // 0.5초마다 조건 체크
});