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

// 공통 스타일 설정 함수
function setStepStyles(activeIndex, totalSteps, stepTexts, transformOffsets) {
    for (let i = 0; i < totalSteps; i++) {
        const stepClass = `.step${i + 1}`;
        if (i === activeIndex) {
            $(stepClass).css({ "background-color": "var(--main--color)", "color": "#fff" });
            $(stepClass).text(i + 1);
        } else if (i < activeIndex) {
            $(stepClass).css({ "background-color": "var(--main--color)", "color": "#fff" });
            $(stepClass).html(`<span class="material-symbols-outlined">check_small</span>`);
            $(`${stepClass} span`).css("fontSize", "32px");
        } else {
            $(stepClass).css({ "background-color": "#fff", "color": "var(--main--color)" });
            $(stepClass).text(i + 1);
        }
    }

    $(".step-text").text(stepTexts[activeIndex] || "기본 텍스트");
    $(".step-text").css("transform", `translateX(${transformOffsets[activeIndex] || 0}px)`);
}

// 버튼 텍스트 설정 함수
function setButtonText(index) {
    if (index === 15) {
        $("#next-btn").text("처음으로");
    } else if (index >= 10 && index < 15) {
        $("#next-btn").text("건너뛰기");
    } else {
        $("#next-btn").text("다음");
    }
}

// 단계별 로직 설정 함수
function handleSpecialCases(index) {
    if (index === 2) {
        setTimeout(() => {
            window.location.href = "index.html#3"; // 이동할 URL
        }, 12000);
    }

    if (index === 13 || index === 14) {
        $('.guide-img').addClass('fade-in');
    } else {
        $('.guide-img').removeClass('fade-in');
    }
}

// 단계별 업데이트 함수
function updateStep(index) {
    const stepTexts = [
        "장비 체크", "장비 체크", "장비 체크", "장비 체크", "장비 체크",
        "코스 선택", "코스 선택", "자세 학습", "자세 학습", "자세 학습",
        "자세 학습", "자세 학습", "자세 학습", "자세 학습", "자세 학습",
        "준비 완료"
    ];

    const transformOffsets = [0, 0, 0, 0, 0, 80, 80, 160, 160, 160, 160, 160, 160, 160, 160, 240];
    const totalSteps = 4; // 총 스텝 수 (1~4단계)

    setStepStyles(index, totalSteps, stepTexts, transformOffsets);
    setButtonText(index);
    handleSpecialCases(index);
}

// 해시 변경 이벤트 핸들러
function onHashChange() {
    currentIndex = getCurrentIndexFromURL();
    switch (currentIndex) {
        case 0:
            console.log("Case 0: 초기 상태");
            updateStep(0);
            break;
        case 1:
            console.log("Case 1: 애니메이션 1 시작");
            updateStep(1);
            break;
        case 2:
            console.log("Case 2: 애니메이션 2 시작");
            updateStep(2);
            break;
        case 3:
            console.log("Case 3: 애니메이션 3 시작");
            updateStep(3);
            break;
        case 4:
            console.log("Case 4: 애니메이션 4 시작");
            updateStep(4);
            break;
        case 5:
            console.log("Case 5: 애니메이션 5 시작");
            updateStep(5);
            break;
        case 6:
            console.log("Case 6: 애니메이션 6 시작");
            updateStep(6);
            break;
        case 7:
            console.log("Case 7: 애니메이션 7 시작");
            updateStep(7);
            break;
        case 8:
            console.log("Case 8: 애니메이션 8 시작");
            updateStep(8);
            break;
        case 9:
            console.log("Case 9: 애니메이션 9 시작");
            updateStep(9);
            break;
        case 10:
            console.log("Case 10: 애니메이션 10 시작");
            updateStep(10);
            break;
        case 11:
            console.log("Case 11: 애니메이션 11 시작");
            updateStep(11);
            break;
        case 12:
            console.log("Case 12: 애니메이션 12 시작");
            updateStep(12);
            break;
        case 13:
            console.log("Case 13: 애니메이션 13 시작");
            updateStep(13);
            break;
        case 14:
            console.log("Case 14: 애니메이션 14 시작");
            updateStep(14);
            break;
        case 15:
            console.log("Case 15: 마지막 애니메이션");
            updateStep(15);
            break;
        default:
            console.log("알 수 없는 상태: 기본으로 설정");
            currentIndex = 0;
            updateStep(0);
    }
}

// 초기화
let currentIndex = getCurrentIndexFromURL();
onHashChange();

// 해시 변경 이벤트 리스너 추가
window.addEventListener('hashchange', onHashChange);
