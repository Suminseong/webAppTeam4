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
        'https://teachablemachine.withgoogle.com/models/Y0XtcXWKz/', // 스틱 모델 stick-true, stick-false, nothing
        'https://teachablemachine.withgoogle.com/models/Tba8Oy801/', // 가방 모델 bag-true, bag-false, nothing
        'https://teachablemachine.withgoogle.com/models/JqI_zv0kw/'  // 신발 모델 shoes-true, shoes-false, nothing
    ];

    let models = [];
    let classificationInterval = 1000; // ms초마다 분류
    let intervalId = null; // 분류 타이머 ID 들어갈 자리
    let latestResults = { result1: '', result2: '', result3: '' }; // 마지막 분류 결과 저장
    let isClassified = 0; // 모델 실행 여부 플래그
    let isModelActive = false;


    // 캔버스별 웹캠 범위 설정 (x, y, width, height)
    // 카메라 해상도에 따라 가변적이니까 하드웨어 폰캠 따라서 잘 노가다 뛰세요^^
    const canvasAreas = [
        { x: 200, y: 160, width: 210, height: 200 }, // canvas1
        { x: 200, y: 90, width: 240, height: 180 }, // canvas2
        { x: 190, y: 250, width: 200, height: 260 }  // canvas3
    ];

    if (window.currentIndex > 3) {
        console.log(`currentIndex is ${window.currentIndex}. Model classification will be disabled.`);
        disableModelFunctionality(); // 분류 기능 비활성화
        return; // 더 이상의 초기화 진행 중단
    }

    function disableModelFunctionality() {
        console.log('Disabling model functionality.');

        // 분류 루프 중단
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('Classification loop stopped.');
        }

        // 웹캠 스트림 종료
        if (webcamElement.srcObject) {
            webcamElement.srcObject.getTracks().forEach(track => track.stop());
            console.log('Webcam stream stopped.');
        }

        // 모델 상태 초기화
        models = [];
        isModelActive = false;
    }

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
    async function loadModels() {
        if (isModelActive == false) {
            document.getElementById('loading').style.display = 'block';
            for (const url of modelURLs) {
                const model = await tmImage.load(url + 'model.json', url + 'metadata.json');
                models.push(model);
            }
            document.getElementById('loading').style.display = 'none';
            console.log('Models loaded');
            isClassified = 0; // 모델이 실행되었음을 표시

            isModelActive = true;
        }
        if (window.currentIndex !== 2 || isClassified === 1) {
            console.log(`Model loading skipped. currentIndex is ${window.currentIndex} or model already classified.`);
            return;
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
        if (currentIndex == 2) {
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
            startCountdown();

            //결과 저장
            latestResults[resultElementId] = highestPrediction.className;
            console.log(`${resultElementId}: ${highestPrediction.className}`);
        }
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

    function handleResults(results) { 
        const keyToLabel = { ///result1,2,3을 라벨링하고 긁어오게
            result1: 'stick',
            result2: 'bag',
            result3: 'shoes'
        };

        //페이지 이동 처리는 classAction에서 수행하니까 여기서 이상한거 건들면 안되비낟!

        const pages = []; //페이지 순서대로 들어갈 배열
        const resultKeys = Object.keys(results);

        for (const key of resultKeys) {
            const label = keyToLabel[key]; // 매핑 테이블에서 레이블 가져오기
            const expectedFalse = `${label}-false`.trim().toLowerCase();
            const currentValue = results[key].trim().toLowerCase();

            console.log(`Key: ${key}, Label: ${label}, Expected: ${expectedFalse}, Current: ${currentValue}`);
            if (currentValue === 'nothing') {
                window.location.href = 'animation/classify_error.html';
                return;
            } else if (currentValue === expectedFalse) {
                pages.push(`${label}_alert.html`); //없다면 신발/가방/스틱_alert.html 배열로 넣기
            }
        }

        if (pages.length > 0) {
            console.log('미착용 장비가 식별되었습니다');
            window.startPageSequence(pages); //페이지 넘기기 시작
        } else {
            console.log('모두 참. 페이지 이동 없음.');
        }
    }

    function startCountdown() {
        if (currentIndex == 2) {
            console.log('Countdown started.');
            setTimeout(() => {
                stopClassification(); // 분류 멈춤
                stopWebcam();         // 웹캠 멈춤
            }, 7000); // 7초 뒤 실행
        }
        else {
            return;
        }
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
    if (window.currentIndex > 2) { // 특정 값이 아닐 때 실행 중지
        console.log(`Execution stopped due to currentIndex condition. now index is ${window.currentIndex}`);
        return;
    }
    // 정상적으로 실행
    console.log(`Executing classGear.js logic... now index is ${currentIndex}`);
    return;
}

// 주기적으로 상태 확인 (필요 시 사용)
setInterval(() => {
    executeClassGear();
}, 1000);