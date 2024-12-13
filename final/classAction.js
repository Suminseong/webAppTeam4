$(document).ready(function () {
    let pageQueue = [];
    let currentPageIndex = 0;

    // 절대 경로 확인 및 변환
    function ensureAbsolutePath(path) {
        if (path.startsWith('/')) {
            return path; // 이미 절대 경로
        } else {
            return `/final/animation/${path}`; // 상대 경로 변환
        }
    }

    // 다음 페이지로 이동
    function navigateToNextPage() {
        if (currentPageIndex < pageQueue.length) {
            const nextPage = pageQueue[currentPageIndex];
            currentPageIndex++;

            const query = `?index=${currentPageIndex}&queue=${encodeURIComponent(JSON.stringify(pageQueue))}`;
            window.location.href = nextPage + query;
        } else {
            console.log("All alert pages displayed.");
            location.href = '/final/index.html#4';
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
        console.log(`Restored page queue: ${pageQueue}, current index: ${currentPageIndex}`);
    }

    // "다음" 버튼 클릭 이벤트 처리
    $(document).on('click', '#btn2', function () {
        navigateToNextPage();
    });
});
