$(document).ready(function () {
    const $sectionWrap = $(".section-wrap"); // 섹션 래퍼
    const sectionWidth = 1080; // 섹션 너비
    window.currentIndex = 0; // 현재 섹션 인덱스   

    // 섹션 이동 함수
    function moveToSection(index) {
        if (index >= 0 && index < $(".section-wrap section").length) {
            currentIndex = index;
            $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);
            window.location.hash = `#${currentIndex}`; // URL 해시 업데이트
            updateUI(currentIndex);
        }
    }

    // UI 업데이트 함수
    function updateUI(index) {
        if (index === 0) {
            $("#language-btn-wrap").css("display", "block");
            $("#undo-btn, #next-btn").css("display", "none");
        } else {
            $("#language-btn-wrap").css("display", "none");
            $("#undo-btn, #next-btn").css("display", "block");
        }
    }

    // 체크하기 버튼 클릭 시
    $("#check-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            moveToSection(currentIndex + 1);
        }
    });

    // 다음 버튼 클릭 시
    $("#next-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            moveToSection(currentIndex + 1);
        }
    });

    // 이전 버튼 클릭 시
    $("#undo-btn").on("click", function () {
        if (currentIndex > 0) {
            moveToSection(currentIndex - 1);
        }
    });

    // 해시 변경 시 처리
    $(window).on("hashchange", function () {
        const hash = window.location.hash.replace("#", "");
        const index = parseInt(hash, 10);
        if (!isNaN(index)) {
            moveToSection(index);
        }
    });

    // 초기화: 페이지 로드 시 해시 처리
    const initialHash = window.location.hash.replace("#", "");
    const initialIndex = parseInt(initialHash, 10);
    if (!isNaN(initialIndex)) {
        moveToSection(initialIndex);
    } else {
        moveToSection(0); // 기본값
    }


// **현재 섹션 인덱스 가져오기**
function getCurrentIndex() {
    const hash = window.location.hash.replace("#", "");
    const index = parseInt(hash, 10);
    if (!isNaN(index)) {
        return index;
    } else {
        return 1; // 기본값은 1
    }
}

// **UI 업데이트 함수**
function updateStepUI(currentIndex) {

    // 모든 li 스타일 초기화
    $(".step li").css({
        "background-color": "#fff",
        "color": "var(--main--color)",
    });

    // currentIndex에 따라 스타일 및 텍스트 업데이트
    if (currentIndex >= 1 && currentIndex <= 4) {
        // 1~4: 첫 번째 단계 활성화
        $(".stepOn").css({
            "background-color": "var(--main--color)",
            "color": "#fff",
        });
        $(".step-text").text("장비 체크");
        $(".step-text").css("transform", "translateX(0px)");
        $(".stepOn").text("1")
    } else if (currentIndex >= 5 && currentIndex <= 6) {
        // 5~6: 두 번째 단계 활성화
        $(".stepOn").css({
            "background-color": "#fff",
            "color": "var(--main--color)",
        });
        $(".stepTw").css({
            "background-color": "var(--main--color)",
            "color": "#fff",
        });
        $(".step-text").text("코스 선택");
        $(".step-text").css("transform", "translateX(80px)");
        $(".stepOn").html(`<span class="material-symbols-outlined">check_small</span>`)
        $(".stepOn span").css("fontSize", "32px");
        $(".stepTw").text("2")

    } else if (currentIndex >= 7 && currentIndex < 15) {
        // 7~15: 세 번째 단계 활성화
        $(".stepOn").css({
            "background-color": "#fff",
            "color": "var(--main--color)",
        });
        $(".stepTw").css({
            "background-color": "#fff",
            "color": "var(--main--color)",
        });
        $(".stepTh").css({
            "background-color": "var(--main--color)",
            "color": "#fff",
        });
        $(".step-text").text("자세 학습");
        $(".step-text").css("transform", "translateX(160px)");
        $(".stepOn").html(`<span class="material-symbols-outlined">check_small</span>`)
        $(".stepOn span").css("fontSize", "32px");
        $(".stepTw").html(`<span class="material-symbols-outlined">check_small</span>`)
        $(".stepTw span").css("fontSize", "32px");
        $(".stepTh").text("3")
    } else if (currentIndex === 15) {
        // 15: 네 번째 단계 활성화
        $(".stepOn").css({
            "background-color": "#fff",
            "color": "var(--main--color)",
        });
        $(".stepTw").css({
            "background-color": "#fff",
            "color": "var(--main--color)",
        });
        $(".stepTh").css({
            "background-color": "#fff",
            "color": "var(--main--color)",
        });
        $(".stepFo").css({
            "background-color": "var(--main--color)",
            "color": "#fff",
        });
        $(".step-text").text("준비 완료");
        $(".step-text").css("transform", "translateX(240px)");
        $(".stepOn").html(`<span class="material-symbols-outlined">check_small</span>`)
        $(".stepOn span").css("fontSize", "32px");
        $(".stepTw").html(`<span class="material-symbols-outlined">check_small</span>`)
        $(".stepTw span").css("fontSize", "32px");
        $(".stepTh").html(`<span class="material-symbols-outlined">check_small</span>`)
        $(".stepTh span").css("fontSize", "32px");
        $(".stepFo").text("4")
    }
}

// **해시 변경 시 호출되는 함수**
function onHashChange() {
    const currentIndex = getCurrentIndex();
    updateStepUI(currentIndex);
}

// **초기화: 페이지 로드 시 실행**
onHashChange();

// **해시 변경 감지**
$(window).on("hashchange", function () {
    onHashChange();
});


    // **예시: 섹션 이동 함수 (필요에 따라 구현)**
    // function moveToSection(index) {
    //     // 섹션 이동 로직 구현
    //     window.location.hash = `#${index}`; // 해시 업데이트
    // }

    // **예시: 버튼 클릭 시 섹션 이동 (필요에 따라 구현)**
    // $("#next-btn").on("click", function () {
    //     const currentIndex = getCurrentIndex();
    //     moveToSection(currentIndex + 1);
    // });


    // 언어별 텍스트 데이터
    const translations = {
        kr: {
            fontFamily: "Noto Sans KR, sans-serif",
            conAtext1: "체크하기",
            conAtext2: "코스보기",
            undo: "이전",
            next: "다음",
        },
        en: {
            fontFamily: "Noto Sans KR, sans-serif",
            conAtext1: "Check",
            conAtext2: "View Course",
            undo: "BACK",
            next: "NEXT",
        },
        cn: {
            fontFamily: "Noto Sans SC, sans-serif",
            conAtext1: "检查",
            conAtext2: "查看",
            undo: "上一步",
            next: "下一步",
        },
        jp: {
            fontFamily: "Noto Sans JP, sans-serif",
            conAtext1: "チェックする",
            conAtext2: "コースを見る",
            undo: "戻る",
            next: "次へ",
        },
    };

    $("#kr").addClass("active");
    $("#check-btn p").text(translations.kr.conAtext1);
    $("#route-btn p").text(translations.kr.conAtext2);
    $(".section-wrap").css("font-family", translations.kr.fontFamily);

    // 언어 변경 기능
    $("#language-btn-wrap button").on("click", function () {
        const lang = $(this).attr("id"); // 현재 클릭된 버튼의 ID (언어 코드)

        // 텍스트 변경
        $("#check-btn p").text(translations[lang].conAtext1);
        $("#route-btn p").text(translations[lang].conAtext2);
        $("#undo-btn").text(translations[lang].undo);
        $("#next-btn").text(translations[lang].next);

        // 폰트 변경
        $(".section-wrap").css("font-family", translations[lang].fontFamily);

        // 버튼 스타일 변경
        $("#language-btn-wrap button").removeClass("active");
        $(this).addClass("active");
    });

    // 코스 선택 기능
    $(".conF-icon").on("click", function () {
        // 기존 클래스 및 스타일 제거
        $(".course-type").removeClass("course-action").css("opacity", 0);
        $(".conF-icon").removeClass("course-action");

        // 텍스트와 이미지 변경 대상

        // 클릭한 버튼에 따라 관련 요소 업데이트.
        if (this.id === "conF-Atype") {
            $(this).addClass("course-action");
            $("#course-easy").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 1s",
            });
            $("#conF-km").html("10km (약 3시간 30분 소요)");
            $("#conF-img").attr("src", "./Img/conG/seonjea.png");
            $("#bottom-modal").css("opacity", "1");
            $("#course-level").text("초급");
            $("#course-level").css("color", "#4ABB74");
            $("#course-name").text("선재산 코스");
            $("#course-name").css("color", "#4ABB74");
        } else if (this.id === "conF-Btype") {
            $(this).addClass("course-action");
            $("#course-normal").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 1s",
            });
            $("#conF-km").html("4.4km (약 2시간 10분 소요)");
            $("#conF-img").attr("src", "./Img/conG/dongdeasan.png");
            $("#bottom-modal").css("opacity", "1");
            $("#course-level").text("중급");
            $("#course-level").css("color", "#4092D2");
            $("#course-name").text("동대산 코스");
            $("#course-name").css("color", "#4092D2");
        } else if (this.id === "conF-Ctype") {
            $(this).addClass("course-action");
            $("#course-hard").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 1s",
            });
            $("#conF-km").html("13.3km (약 7시간 소요)");
            $("#conF-img").attr("src", "./Img/conG/sogum.png");
            $("#bottom-modal").css("opacity", "1");
            $("#course-level").text("상급");
            $("#course-level").css("color", "#3F4BDA");
            $("#course-name").text("소금강산 코스");
            $("#course-name").css("color", "#3F4BDA");
        }
    });
});
