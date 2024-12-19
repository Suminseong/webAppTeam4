/* 

클래스 분류 결과별 페이지 이동 기능

JQuery

*/

$(document).ready(function () {
    let pageQueue = []; //오류 페이지 큐
    let currentPageIndex = 0;


    // 절대 경로 확인 및 변환
    function ensureAbsolutePath(path) {
        if (path.startsWith('/')) {
            return path; // 이미 루트 경로임
        } else {
            return `/final/animation/${path}`; // 경고 링크로 날리기
        }
    }

    //링크 생성하면
        //bag_alert.html?index=1&queue=%5B"%2Ffinal%2Fanimation%2Fbag_alert.html"%2C"%2Ffinal%2Fanimation%2Fshoes_alert.html"%5D
        //형태로 나옴.

        //ㄴ{현재페이지링크.html}+{띄워준경고페이지index}+{큐에 들어있는 남은 링크들}

    // 다음 페이지로 이동. 링크에 들어있는 쿼리 처리하기
    function navigateToNextPage() {
        if (currentPageIndex < pageQueue.length) {
            const nextPage = pageQueue[currentPageIndex];
            currentPageIndex++;

            //링크 생성
            const query = `?index=${currentPageIndex}&queue=${encodeURIComponent(JSON.stringify(pageQueue))}`;
            window.location.href = nextPage + query;
        } else {
            // console.log("경고페이지 큐 비었음");
            location.href = '/final/animation/대여소.html';
        }
    }

    // 페이지 이동 초기화
    window.startPageSequence = function (pages) {
        pageQueue = pages.map(page => ensureAbsolutePath(page)); // 중복 방지 처리
        currentPageIndex = 0;
        navigateToNextPage();
    };

    // 현재 페이지 복원
    const urlParams = new URLSearchParams(window.location.search);
    const queueParam = urlParams.get('queue');
    const indexParam = urlParams.get('index');

    if (queueParam && indexParam) {
        pageQueue = JSON.parse(decodeURIComponent(queueParam)).map(page => ensureAbsolutePath(page));
        currentPageIndex = parseInt(indexParam, 10) || 0;
    }

    // "다음" 버튼 클릭 이벤트 처리
    $(document).on('click', '#btn2', function () {
        navigateToNextPage();
    });
});
