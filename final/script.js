$(document).ready(function () {
    const $sectionWrap = $(".section-wrap"); // 섹션 래퍼
    const sectionWidth = 1080; // 섹션 너비
    window.currentIndex = 0; // 현재 페이지 인덱스

    // 체크하기 버튼 클릭 시
    $("#check-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            currentIndex++; // 다음 페이지로 이동
            $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);

    // Step 스타일 업데이트
    switch (currentIndex) {
        case 1:
            $(".step li").eq(0).css({
                "background-color": "var(--main--color)",
                color: "#fff",
            });
            break;
        case 5:
            $(".step li").eq(1).css({
                "background-color": "var(--main--color)",
                color: "#fff",
            });
            break;
        case 7:
            $(".step li").eq(2).css({
                "background-color": "var(--main--color)",
                color: "#fff",
            });
            break;
        case 15:
            $(".step li").eq(3).css({
                "background-color": "var(--main--color)",
                color: "#fff",
            });
            break;
    }

            // 언어 버튼 숨기기
            $("#language-btn-wrap").css("display", "none");

            // 이전/다음 버튼 보이기
            $("#undo-btn, #next-btn").css("display", "block");
        }
    });


    //코스보기 버튼
    $(".conF-icon").on("click", function () {
        // 기존 클래스 및 스타일 제거
        $(".course-type").removeClass("course-action").css("opacity", 0);
        $(".conF-icon").removeClass("course-action");

        // 텍스트와 이미지 변경 대상
        const $conFKm = $("#conF-km");
        const $conFImg = $("#conF-img");

        // 클릭한 버튼에 따라 관련 요소 업데이트
        if (this.id === "conF-Atype") {
            // A타입
            $(this).addClass("course-action");
            $("#course-easy").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 2s",
            });

            // 텍스트 및 이미지 업데이트
            $conFKm.html("10km (약 3시간 30분 소요)");
            $conFImg.attr("src", "./Img/conF/seonjea.png");
        } else if (this.id === "conF-Btype") {
            // B타입
            $(this).addClass("course-action");
            $("#course-normal").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 2s",
            });

            // 텍스트 및 이미지 업데이트
            $conFKm.html("4.4km (약 2시간 10분 소요)");
            $conFImg.attr("src", "./Img/conF/dongdeasan.png");
        } else if (this.id === "conF-Ctype") {
            // C타입
            $(this).addClass("course-action");
            $("#course-hard").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 2s",
            });

            // 텍스트 및 이미지 업데이트
            $conFKm.html("13.3km (약 7시간 소요)");
            $conFImg.attr("src", "./Img/conF/sogum.png");
        }
    });

    // Route 버튼 클릭 시 (conA-sub 추가)
    $("#route-btn").on("click", function () {
        if ($("#conA-sub").length === 0) {
            // conA-sub 섹션이 없으면 추가
            $("<section id='conA-sub'><p>ConA Sub Content</p></section>").insertBefore("#conB");
        }

        // 언어 버튼 숨기기
        $("#language-btn-wrap").css("display", "none");

        // 이전/다음 버튼 보이기
        $("#undo-btn").css("display", "block");

        // 섹션 이동
        if (currentIndex < $(".section-wrap section").length) {
            currentIndex++;
            $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);
        }
    });

    // 다음 버튼 클릭 시
    $("#next-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            currentIndex++;
            $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);
        }
        
    });

    // 이전 버튼 클릭 시
    $("#undo-btn").on("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);

            // 최초 화면으로 돌아왔을 때 언어 버튼 보이고, undo/next 버튼 숨기기
            if (currentIndex === 0) {
                $("#language-btn-wrap").css("display", "block");
                $("#undo-btn, #next-btn").css("display", "none");

                // conA-sub 삭제
                if ($("#conA-sub").length > 0) {
                    $("#conA-sub").remove();
                }
            }
        }
    });

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
