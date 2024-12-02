$(document).ready(function() {
    const checkConditions = function() {
        const result1 = $('#result1').text();
        const result2 = $('#result2').text();
        const result3 = $('#result3').text();

        if (result1.includes('True') && result2.includes('True') && result3.includes('True')) {
            console.log('All conditions met! Performing action...');
            // 여기에 필요한 액션 추가
        }
    };

    setInterval(checkConditions, 500); // 0.5초마다 조건 체크
});