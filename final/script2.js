//html2에 쓸 js

let thisIndex = 0;
$(document).ready(function () {
    const $sectionWrap = $(".section-wrap");
    const sectionWidth = 1080;

    function moveToSection(index) {
        $("#undo-btn, #next-btn").css("display", "block");

        if (index >= 0 && index < $(".section-wrap section").length) {
            thisIndex = index; // thisIndex 갱신
            currentIndex = thisIndex + 4; // currentIndex 갱신
            $sectionWrap.css("transform", `translateX(-${sectionWidth * thisIndex}px)`);
        }
        window.location.hash = `#${currentIndex}`;
        console.log(`current = ${currentIndex}, thisIndex = ${thisIndex}`);
    }

    $("#next-btn").on("click", function () {
        if (thisIndex < $(".section-wrap section").length - 1) {
            moveToSection(thisIndex + 1);
        } else {
            window.location.href = "index.html"; // 마지막 섹션에서 #0으로 이동
        }
    });
    
    $("#undo-btn").on("click", function () {
        if (thisIndex > 0) {
            moveToSection(thisIndex - 1);
        } else {
            window.location.hash = "#0"; // 첫 섹션에서 뒤로가기 #0으로 이동
        }
    });

    $(window).on("hashchange", function () {
        const hash = window.location.hash.replace("#", "");
        const index = parseInt(hash, 10) - 4;
        if (!isNaN(index)) {
            moveToSection(index);
        }
    });

    const initialHash = window.location.hash.replace("#", "");
    const initialIndex = parseInt(initialHash, 10) - 4;
    if (!isNaN(initialIndex) && initialIndex >= 0 && initialIndex < $(".section-wrap section").length) {
        moveToSection(initialIndex);
    } else {
        moveToSection(0);
    }

    // 코스 선택 기능
    $(".conF-icon").on("click", function () {
        // 코스 속성 제거
        $(".course-type").removeClass("course-action").css("opacity", 0);
        $(".conF-icon").removeClass("course-action");

        // 클릭한 버튼별 코스 띄우기
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
