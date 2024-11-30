/*

주의

이 파일은 임시로 맹근 테스트용 소스입니다. 
이대로 복붙하면 답없는 결과물 튀어나올 수 있으니 모쪼록 이거 그대로 갖다 쓰지 마시고 각주 잘 읽어가면서 진행해주세요
안그러면 저도 어떻게 못합니다.

*/

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