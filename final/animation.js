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

// 스텝 스타일 업데이트 함수
function updateStepStyles(currentStep, text, transformX, highlightSteps) {
    $(".step li").css({
        "background-color": "#fff",
        "color": "var(--main--color)",
    });

    // 강조할 스텝만 스타일 변경
    highlightSteps.forEach(step => {
        $(`.step${step}`).css({
            "background-color": "var(--main--color)",
            "color": "#fff",
        });
    });

    $(".step-text").text(text);
    $(".step-text").css("transform", `translateX(${transformX}px)`);
}

// 로티 애니메이션 세그먼트 실행 함수
function playLottieInSegments(lottieElement, segments) {
    let currentSegmentIndex = 0;

    function playNextSegment() {
        if (currentSegmentIndex < segments.length) {
            lottieElement.playSegments(segments[currentSegmentIndex], true);
            currentSegmentIndex++;
        } else {
            lottieElement.removeEventListener('complete', playNextSegment);
        }
    }

    // 이벤트 리스너 중복 방지
    lottieElement.removeEventListener('complete', playNextSegment);
    lottieElement.addEventListener('complete', playNextSegment);

    playNextSegment(); // 첫 번째 구간 실행
}

// URL 해시 변경에 따른 이벤트 핸들러
function onHashChange() {
    const currentIndex = getCurrentIndexFromURL();
    switch (currentIndex) {
        case 0:
            console.log("Case 0: 초기 상태");
            updateStepStyles("On", "장비 체크", 0, ["On"]);
            break;

        case 1:
            console.log("Case 1: 애니메이션 1 시작");
            updateStepStyles("On", "장비 체크", 0, ["On"]);
            $("#next-btn").text("다음");
            break;

        case 2:
            console.log("Case 2: 애니메이션 2 시작");
            setTimeout(() => {
                window.location.href = "index.html#3"; // 다음 상태로 이동
            }, 12000);
            updateStepStyles("On", "장비 체크", 0, ["On"]);
            $("#next-btn").text("다음");
            break;

        case 11:
            console.log("Case 11: 애니메이션 11 시작");
            updateStepStyles("Th", "자세 학습", 160, ["Th"]);

            const lottieElement = document.querySelector('dotlottie-wc');
            const segments11 = [[0, 30], [31, 60], [61, 90]];

            lottieElement.addEventListener('ready', () => {
                playLottieInSegments(lottieElement, segments11);
            });
            break;

        case 14:
            console.log("Case 14: 애니메이션 14 시작");
            updateStepStyles("Th", "자세 학습", 160, ["Th"]);

            const lottieElement14 = document.querySelector('dotlottie-wc');
            const segments14 = [[0, 40], [41, 80], [81, 120]];

            lottieElement14.addEventListener('ready', () => {
                playLottieInSegments(lottieElement14, segments14);
            });
            break;

        case 15:
            console.log("Case 15: 마지막 애니메이션");
            updateStepStyles("Fo", "준비 완료", 240, ["Fo"]);
            $("#next-btn").text("처음으로");
            break;

        default:
            console.log("알 수 없는 상태: 기본으로 설정");
            updateStepStyles("On", "장비 체크", 0, ["On"]);
    }
}

// 초기화
let currentIndex = getCurrentIndexFromURL();
onHashChange();

// 해시 변경 이벤트 리스너 추가
window.addEventListener('hashchange', onHashChange);
