/*

언어 : Vanila JS
TM 동작하는 영역

*/



document.addEventListener('DOMContentLoaded', () => {
    const webcamElement = document.getElementById('webcam');
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');

    // 모델 URL. canvas 1~3 순서임!
    const modelURLs = [
        'https://teachablemachine.withgoogle.com/models/Y0XtcXWKz/', // 스틱 모델 stick-true, stick-false, nothing
        'https://teachablemachine.withgoogle.com/models/yoZWvbjdZ/', // 가방 모델 bag-true, bag-false, nothing
        'https://teachablemachine.withgoogle.com/models/BZeQs5E7-/'  // 신발 모델 shoes-true, shoes-false, nothing
    ];

    let models = [];
    let classificationInterval = 1000; // ms초마다 분류
    let intervalId = null; // 분류 타이머 ID 들어갈 자리
    let latestResults = { result1: '', result2: '', result3: '' }; // 마지막 분류 결과 저장
    let isClassified = 0; // 모델 실행 여부 플래그
    let isModelActive = false; //모델 활성화 여부 검사. 


    // 캔버스별 웹캠 범위 설정 (x, y, width, height)
    // 카메라 해상도에 따라 가변적이니까 하드웨어 폰캠 따라서 잘 노가다 뛰세요^^
    const canvasAreas = [
        { x: 210, y: 172, width: 210, height: 250 }, // canvas1
        { x: 200, y: 90, width: 240, height: 180 }, // canvas2
        { x: 190, y: 280, width: 190, height: 190 }  // canvas3
    ];

    if (window.currentIndex > 3) { //currentIndex가 2일때가 분류 모델 쓰니까
        console.log(`currentIndex is ${window.currentIndex}. Model classification will be disabled.`);
        disableModelFunctionality(); // 분류 기능 비활성화
        return; //초기화 진행 중단
    }

    function disableModelFunctionality() {
        console.log('모델 중단중.');

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('분류 중지됨.');
        }

        if (webcamElement.srcObject) {
            webcamElement.srcObject.getTracks().forEach(track => track.stop());
            console.log('웹캠 중단 중');
        }

        // 모델 상태 초기화. 안하면 분류 다시 못함
        models = [];
        isModelActive = false;
    }

    // 웹캠 켜는 부분
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
        } catch (err) {
            alert('웹캠 죽음');
            console.error('웹캠 에러 정보:', err);
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
            console.log('모델이 로드되었습니다');
            isClassified = 0; // 모델이 실행되었음을 표시

            isModelActive = true;
        }
        if (window.currentIndex !== 2 || isClassified === 1) {
            console.log(`모델 로드 과정 스킵.. ${window.currentIndex} 인덱스가 2인데 이 코드가 계속 뜬다면? 아시죠?`);
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
            // 필터 쓰면 안되빈다!
            ctx.drawImage(
                webcamElement,
                area.x, area.y, area.width, area.height,
                0, 0, canvas1.width, canvas1.height      // 캔버스에 맞게 그리기
            );
            if (index === 0) ctx.filter = 'grayscale(0%)'; //1번 캔버스 필터(구별용)
            if (index === 1) ctx.filter = 'sepia(0%)'; //2번 캔버스 필터  (구별용)
            if (index === 2) ctx.filter = 'grayscale(0%)'; //3번 캔버스 필터(구별용)
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

            handleResults(latestResults);
        }
    }

    function handleResults(results) {
        const keyToLabel = { ///result1,2,3을 라벨링하고 긁어오게
            result1: 'shoes',
            result2: 'bag',
            result3: 'stick'
        };

        const pages = []; // 페이지 순서대로 들어갈 배열
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
                pages.push(`${label}_alert.html`); // 없으면 신발/가방/스틱_alert.html 배열로 넣기
            }
        }

        // 결과 처리
        if (pages.length > 0) {
            console.log('미착용 장비가 식별되었습니다');
            window.startPageSequence(pages); // 페이지 넘기기 시작
        } else {
            location.href = 'index2.html';
        }
    }


    function stopWebcam() {
        if (webcamElement.srcObject) {
            webcamElement.srcObject.getTracks().forEach(track => track.stop());
            webcamElement.srcObject = null; // 스트림을 제거
            console.log('웹캠 중단.');
        } else {
            console.log('실행중인 웹캠 없음 예외처리.');
        }
    }

    function startCountdown() {
        if (currentIndex == 2) {
            setTimeout(() => {
                stopClassification(); // 분류 멈춤
                stopWebcam();         // 웹캠 멈춤
            }, 6000); // 6초 뒤 실행
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
        console.log(`currentIndex값 읽음. 현재 currentIndex값은 ${window.currentIndex}`);
        return;
    }
    // 정상적으로 실행
    // console.log(` classGear.js 실행중, currentIndex값 = ${currentIndex}`); 디버깅용
    return;
}

// 주기적으로 상태 확인(디버깅)
setInterval(() => {
    executeClassGear();
}, 1000);