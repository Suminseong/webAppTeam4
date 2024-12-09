$(document).ready(function () {
    let pageQueue = [];
    let currentPageIndex = 0;

    // 다음 페이지로 이동
    function navigateToNextPage() {
        if (currentPageIndex < pageQueue.length) {
            const nextPage = pageQueue[currentPageIndex];
            currentPageIndex++;
            const query = `?index=${currentPageIndex}&queue=${encodeURIComponent(JSON.stringify(pageQueue))}`; // URL에 alert 페이지 관련정보 저장후 뒷 페이지로 전달.
            window.location.href = nextPage + query; // 쿼리 매개변수 추가하여 이동
        } else {
            console.log("All alert pages displayed.");
        }
    }

    // 페이지 이동 초기화
    window.startPageSequence = function (pages) {
        pageQueue = pages;
        currentPageIndex = 0; // 초기화
        navigateToNextPage();
    };

    // 현재 페이지 복원
    const urlParams = new URLSearchParams(window.location.search);
    const queueParam = urlParams.get('queue');
    const indexParam = urlParams.get('index');

    if (queueParam && indexParam) {
        pageQueue = JSON.parse(decodeURIComponent(queueParam));
        currentPageIndex = parseInt(indexParam, 10) || 0;
        console.log(`Restored page queue: ${pageQueue}, current index: ${currentPageIndex}`);
    }

    // "다음" 버튼 클릭 이벤트 처리
    $(document).on('click', '#next-button', function () {
        navigateToNextPage();
    });
});
