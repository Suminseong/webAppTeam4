$(document).ready(function () {
    const $sectionWrap = $(".section-wrap"); // 섹션 래퍼
    const sectionWidth = 1080; // 섹션 너비
    window.currentIndex = 0; // 현재 페이지 인덱스

    // 페이지 이동 함수 (URL 해시 업데이트 포함)
    function moveToSection(index) {
        if (index < 0 || index >= $(".section-wrap section").length) return; // 범위 초과 방지
        currentIndex = index;

        // 섹션 이동
        $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);

        // URL 해시 업데이트
        window.location.hash = `#${currentIndex}`;

        // 언어 버튼, 이전/다음 버튼 상태 업데이트
        if (currentIndex === 0) {
            $("#language-btn-wrap").css("display", "block");
            $("#undo-btn, #next-btn").css("display", "none");

            // conA-sub 삭제
            if ($("#conA-sub").length > 0) {
                $("#conA-sub").remove();
            }
        } else {
            $("#language-btn-wrap").css("display", "none");
            $("#undo-btn, #next-btn").css("display", "block");
        }
    }

    // 초기화: URL 해시를 기반으로 섹션 설정
    function initFromHash() {
        const hash = window.location.hash.replace("#", "");
        const index = parseInt(hash, 10);
        if (!isNaN(index) && index >= 0 && index < $(".section-wrap section").length) {
            moveToSection(index);
        }
    }

    // 체크하기 버튼 클릭 시
    $("#check-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            moveToSection(currentIndex + 1);
        }
    });

    // Route 버튼 클릭 시 (conA-sub 추가)
    $("#route-btn").on("click", function () {
        if ($("#conA-sub").length === 0) {
            $("<section id='conA-sub'><p>ConA Sub Content</p></section>").insertBefore("#conB");
        }
        moveToSection(currentIndex + 1);
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

    // URL 해시 변경 시 (뒤로 가기/앞으로 가기)
    $(window).on("hashchange", function () {
        const hash = window.location.hash.replace("#", "");
        const index = parseInt(hash, 10);
        if (!isNaN(index) && index >= 0 && index < $(".section-wrap section").length) {
            moveToSection(index);
        }
    });

    // 초기화 호출
    initFromHash();

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

    // 언어 기능 코드
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