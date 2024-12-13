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

        // Step 스타일 업데이트
        $(".step li").each(function (i) {
            if (i === index) {
                $(this).css({
                    "background-color": "var(--main--color)",
                    color: "#fff",
                });
            } else {
                $(this).css({
                    "background-color": "",
                    color: "",
                });
            }
        });
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
});
