/*

모델 웹앱에 구현

*/
/*언어 바닐라 자바스크립트입니다*/


document.addEventListener('DOMContentLoaded', () => {
    const webcamElement = document.getElementById('webcam');
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');

    // 모델 URL. canvas 1~3 순서임!
    const modelURLs = [
        'https://teachablemachine.withgoogle.com/models/Pms5gnks6/', // 스틱 모델 stick-true, stick-false, nothing
        'https://teachablemachine.withgoogle.com/models/gxoDba7iI/', // 가방 모델 bag-true, bag-false, nothing
        'https://teachablemachine.withgoogle.com/models/Gn6BtNLwK/'  // 신발 모델 shoes-true, shoes-false, nothing
    ];

    let models = [];
    let classificationInterval = 1000; // ms초마다 분류
    let intervalId = null; // 분류 타이머 ID 들어갈 자리
    let latestResults = { result1: '', result2: '', result3: '' }; // 마지막 분류 결과 저장


    // 캔버스별 웹캠 범위 설정 (x, y, width, height)
    // 카메라 해상도에 따라 가변적이니까 하드웨어 폰캠 따라서 잘 노가다 뛰세요^^
    const canvasAreas = [
        { x: 780, y: 305, width: 360, height: 360 }, // canvas1
        { x: 780, y: 100, width: 360, height: 440 }, // canvas2
        { x: 710, y: 700, width: 400, height: 300 }  // canvas3
    ];

    // 웹캠 시작
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
        } catch (err) {
            alert('웹캠에 접근할 수 없습니다. 웹캠을 확인하세요.');
            console.error('Error accessing webcam:', err);
        }
    }

    // 모델 로드
    async function loadModels() { //12.9 로딩 디스플레이 추가됨
        document.getElementById('loading').style.display = 'block';
        for (const url of modelURLs) {
            const model = await tmImage.load(url + 'model.json', url + 'metadata.json');
            models.push(model);
        }
        document.getElementById('loading').style.display = 'none';
        console.log('Models loaded');
        if (currentIndex == 2) {
            startCountdown();
        }
        
    }

    // 실시간 업데이트
    function updateAndClassify() {
        const contexts = [
            canvas1.getContext('2d'),
            canvas2.getContext('2d'),
            canvas3.getContext('2d')
        ];

        contexts.forEach((ctx, index) => { //캔버스 1부터 차례로 그리고, 필터 넣고 뭐시기 등등
            const area = canvasAreas[index];

            // 지정된 범위를 잘라 캔버스에 그리기
            ctx.drawImage(
                webcamElement,
                area.x, area.y, area.width, area.height,
                0, 0, canvas1.width, canvas1.height      // 캔버스에 맞게 그리기
            );
            if (index === 0) ctx.filter = 'grayscale(0%)'; //1번 캔버스 필터
            if (index === 1) ctx.filter = 'sepia(10%)'; //2번 캔버스 필터  
            if (index === 2) ctx.filter = 'grayscale(10%)'; //3번 캔버스 필터
        });

        classifyFrame(canvas1, models[0], 'result1');
        classifyFrame(canvas2, models[1], 'result2');
        classifyFrame(canvas3, models[2], 'result3');
    }

    // 분류 수행
    async function classifyFrame(canvas, model, resultElementId) {
        const prediction = await model.predict(canvas);
        // console.log(prediction);
        // 가장 높은 확률의 클래스명 가져오기
        const highestPrediction = prediction.reduce((prev, current) =>
            (prev.probability > current.probability) ? prev : current // 저번의 중간 발표때 접하고 공부해봤던 삼항연산자
            /*
            
            저 부분 혹시나 이해 못할까봐 부연설명을 붙이자면
            
            각 모델마다 class 분류를 할 때 확률 비교를 하지요? 이때, class1이 0.1, class2가 0.06, class3이 0.94라고 가정합시다.
            일단, reduce라는 친구가 배열을 순환합니다. 이제 prev.probably(이전 확률)이 current.probably(지금거 확률)보다 큰지 비교하고요
            맞으면 삼항연산자 뒤의 prev값을 뱉고, 틀리면 current 값을 뱉습니다. 단 한 줄의 논리연산으로 if문이나 case문을 대체하다니 완전럭키비키
            
            */
        );

        // 결과 HTML 업데이트

        //결과 저장
        latestResults[resultElementId] = highestPrediction.className;
        console.log(`${resultElementId}: ${highestPrediction.className}`);
    }

    function stopClassification() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('Classification stopped.');
            console.log('Latest Results:', latestResults);

            // 결과에 따른 페이지 이동 처리
            handleResults(latestResults);
        }
    }

    function handleResults(results) { //이미지 분류 결과에 따라 페이지 넘어가는 부분
        const keyToLabel = { ///result1,2,3을 라벨링하고 긁어오게
            result1: 'stick',
            result2: 'bag',
            result3: 'shoes'
        };

        const pages = [];
        const resultKeys = Object.keys(results);

        for (const key of resultKeys) {
            const label = keyToLabel[key]; // 매핑 테이블에서 레이블 가져오기
            const expectedFalse = `${label}-false`.trim().toLowerCase();
            const currentValue = results[key].trim().toLowerCase();

            console.log(`Key: ${key}, Label: ${label}, Expected: ${expectedFalse}, Current: ${currentValue}`);
            if (currentValue === 'nothing') {
                console.log('인식에 문제가 발생했습니다. 오류페이지로 점프합니다.');
                window.location.href = 'animation/classify_error.html';
                return;
            } else if (currentValue === expectedFalse) {
                console.log(`맞지 않는 키를 발견했습니다 ${key}`);
                pages.push(`animation/${label}_alert.html`);
            }
        }

        if (pages.length > 0) {
            console.log('미착용 장비가 식별되었습니다');
            window.startPageSequence(pages);
        } else {
            console.log('모두 참. 페이지 이동 없음.');
        }
    }

    function startCountdown() {
        console.log('Countdown started.');
        setTimeout(() => {
            stopClassification(); // 분류 멈춤
            stopWebcam();         // 웹캠 멈춤
        }, 5000); // 5초 뒤 실행
    }

    // 초기화
    async function init() {
        await startWebcam();
        await loadModels();
        intervalId = setInterval(updateAndClassify, classificationInterval);
    }

    init();
});

function executeClassGear() {
    if (window.currentIndex ==! 2) { // 특정 값이 아닐 때 실행 중지
        console.log(`Execution stopped due to currentIndex condition. now index is ${window.currentIndex}`);
        return;
    }

    // 정상적으로 실행
    console.log("Executing classGear.js logic...");
}

// 주기적으로 상태 확인 (필요 시 사용)
setInterval(() => {
    executeClassGear();
}, 1000);