
// URL에서 #n 형식으로 값을 읽어오는 함수
function getCurrentIndexFromURL() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
        const index = parseInt(hash.substring(1), 10);
        if (!isNaN(index) && index >= 0 && index <= 15) {
            return index;
        }
    }
    return 0; // 기본값
}

// 해시 변경 이벤트 핸들러
function onHashChange() {
    currentIndex = getCurrentIndexFromURL();
    switch (currentIndex) {
        case 0:
            console.log("Case 0: 초기 상태");
            break;
        case 1:
            console.log("Case 1: 애니메이션 1 시작");
            break;
        case 2:
            console.log("Case 2: 애니메이션 2 시작");
            break;
        case 3:
            console.log("Case 3: 애니메이션 3 시작");
            break;
        case 4:
            console.log("Case 4: 애니메이션 4 시작");
            break;
        case 5:
            console.log("Case 5: 애니메이션 5 시작");
            break;
        case 6:
            console.log("Case 6: 애니메이션 6 시작");
            break;
        case 7:
            console.log("Case 7: 애니메이션 7 시작");
            break;
        case 8:
            console.log("Case 8: 애니메이션 8 시작");
            break;
        case 9:
            console.log("Case 9: 애니메이션 9 시작");
            break;
        case 10:
            console.log("Case 10: 애니메이션 10 시작");
            break;
        case 11:
            console.log("Case 11: 애니메이션 11 시작");
            break;
        case 12:
            console.log("Case 12: 애니메이션 12 시작");
            break;
        case 13:
            console.log("Case 13: 애니메이션 13 시작");
            break;
        case 14:
            console.log("Case 14: 애니메이션 14 시작");
            break;
        case 15:
            console.log("Case 15: 마지막 애니메이션");
            break;
        default:
            console.log("알 수 없는 상태: 기본으로 설정");
            currentIndex = 0;
    }
}

// 초기화
currentIndex = getCurrentIndexFromURL();
onHashChange();

// 해시 변경 이벤트 리스너 추가
window.addEventListener('hashchange', onHashChange);
