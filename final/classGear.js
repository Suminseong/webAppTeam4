document.addEventListener('DOMContentLoaded', () => {
    const webcamElement = document.getElementById('webcam');
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');

    // 모델 URL
    const modelURLs = [
        'https://teachablemachine.withgoogle.com/models/Y0XtcXWKz/', // stick 모델
        'https://teachablemachine.withgoogle.com/models/yoZWvbjdZ/', // bag 모델
        'https://teachablemachine.withgoogle.com/models/BZeQs5E7-/'  // shoes 모델
    ];

    let models = [];
    let classificationInterval = 1000; // ms 초마다 분류
    let intervalId = null;
    let latestResults = { result1: '', result2: '', result3: '' };
    let isClassified = 0;
    let isModelActive = false;

    // 캔버스 설정
    const canvasAreas = [
        { x: 210, y: 172, width: 210, height: 250 }, // canvas1
        { x: 200, y: 90, width: 240, height: 180 }, // canvas2
        { x: 190, y: 280, width: 190, height: 190 } // canvas3
    ];

    if (window.currentIndex > 3) { //currentIndex가 2일때가 분류 모델 쓰니까
        console.log(currentIndex is ${window.currentIndex}. Model classification will be disabled.);
        disableModelFunctionality(); // 분류 기능 비활성화
        return; //초기화 진행 중단
    }

    function disableModelFunctionality() {
        console.log('모델 중단 중.');

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('분류 중지됨.');
        }

        if (webcamElement.srcObject) {
            webcamElement.srcObject.getTracks().forEach(track => track.stop());
            console.log('웹캠 중단.');
        }

        models = [];
        isModelActive = false;
    }

    // 웹캠 시작
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
        } catch (err) {
            alert('웹캠 오류 발생');
            console.error('웹캠 에러:', err);
        }
    }

    // 모델 로드
    async function loadModels() {
        if (!isModelActive) {
            document.getElementById('loading').style.display = 'block';
            for (const url of modelURLs) {
                const model = await tmImage.load(`${url}model.json`, `${url}metadata.json`);
                models.push(model);
            }
            document.getElementById('loading').style.display = 'none';
            console.log('모델 로드 완료');
            isModelActive = true;
        }
        if (window.currentIndex !== 2 || isClassified === 1) {
            console.log(모델 로드 과정 스킵.. ${window.currentIndex} 인덱스가 2인데 이 코드가 계속 뜬다면? 아시죠?);
            return;
        }
    }

    function updateAndClassify() {
        const contexts = [
            canvas1.getContext('2d'),
            canvas2.getContext('2d'),
            canvas3.getContext('2d')
        ];

        contexts.forEach((ctx, index) => {
            const area = canvasAreas[index];
            ctx.drawImage(
                webcamElement,
                area.x, area.y, area.width, area.height,
                0, 0, canvas1.width, canvas1.height
            );
        });

        classifyFrame(canvas1, models[0], 'result1');
        classifyFrame(canvas2, models[1], 'result2');
        classifyFrame(canvas3, models[2], 'result3');
    }

    async function classifyFrame(canvas, model, resultElementId) {
        if (window.currentIndex === 2) {
            const prediction = await model.predict(canvas);
            const highestPrediction = prediction.reduce((prev, current) =>
                (prev.probability > current.probability) ? prev : current
            );

            latestResults[resultElementId] = highestPrediction.className;
            console.log(`${resultElementId}: ${highestPrediction.className}`);
        }
    }

    function stopClassification() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('Classification stopped.');
            handleResults(latestResults);
        }
    }

    function handleResults(results) {
        const keyToLabel = { result1: 'stick', result2: 'bag', result3: 'shoes' };
        const pages = [];

        Object.keys(results).forEach(key => {
            const label = keyToLabel[key];
            const expectedFalse = `${label}-false`.trim().toLowerCase();
            const currentValue = results[key].trim().toLowerCase();

            if (currentValue === 'nothing') {
                window.location.href = 'animation/classify_error.html';
            } else if (currentValue === expectedFalse) {
                if (label === 'shoes') {
                    window.location.href = '/final/animation/go_title_error.html';
                } else {
                    pages.push(`${label}_alert.html`);
                }
            }
        });

        if (pages.length > 0) {
            console.log('미착용 장비 식별.');
            window.startPageSequence(pages);
        } else {
            window.location.href = 'index2.html';
        }
    }

    async function init() {
        await startWebcam();
        await loadModels();
        intervalId = setInterval(updateAndClassify, classificationInterval);
    }
    init();
});
