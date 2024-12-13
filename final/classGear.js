document.addEventListener('DOMContentLoaded', () => {
    const webcamElement = document.getElementById('webcam');
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');

    const modelURLs = [
        'https://teachablemachine.withgoogle.com/models/Pms5gnks6/', 
        'https://teachablemachine.withgoogle.com/models/gxoDba7iI/', 
        'https://teachablemachine.withgoogle.com/models/Gn6BtNLwK/'  
    ];

    let models = [];
    let classificationInterval = 1000; // 1초마다 분류
    let intervalId = null;
    let latestResults = { result1: '', result2: '', result3: '' };

    const canvasAreas = [
        { x: 780, y: 305, width: 360, height: 360 },
        { x: 780, y: 100, width: 360, height: 440 },
        { x: 710, y: 700, width: 400, height: 300 }
    ];

    window.currentIndex = 0; // 초기값 설정

    // 웹캠 시작
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
            console.log("Webcam started.");
        } catch (err) {
            alert('웹캠에 접근할 수 없습니다. 웹캠을 확인하세요.');
            console.error('Error accessing webcam:', err);
        }
    }

    // 모델 로드
    async function loadModels() {
        if (window.currentIndex !== 2) {
            console.log(`Model loading skipped. currentIndex is ${window.currentIndex}`);
            return;
        }
        document.getElementById('loading').style.display = 'block';
        for (const url of modelURLs) {
            const model = await tmImage.load(url + 'model.json', url + 'metadata.json');
            models.push(model);
        }
        document.getElementById('loading').style.display = 'none';
        console.log('Models loaded');
        startCountdown();
    }

    // 실시간 업데이트
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

    // 분류 수행
    async function classifyFrame(canvas, model, resultElementId) {
        const prediction = await model.predict(canvas);
        const highestPrediction = prediction.reduce((prev, current) =>
            (prev.probability > current.probability) ? prev : current
        );

        // 결과 저장
        latestResults[resultElementId] = highestPrediction.className;

        console.log(`${resultElementId}: ${highestPrediction.className}`);
    }

    // 분류 종료
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

    // 결과 처리
    function handleResults(results) {
        const keyToLabel = { 
            result1: 'stick',
            result2: 'bag',
            result3: 'shoes'
        };

        const pages = [];
        const resultKeys = Object.keys(results);

        for (const key of resultKeys) {
            const label = keyToLabel[key];
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

    // 카운트다운 시작
    function startCountdown() {
        console.log('Countdown started.');
        setTimeout(() => {
            stopClassification(); // 분류 멈춤
            stopWebcam();         // 웹캠 멈춤
        }, 5000); // 5초 뒤 실행
    }

    let tmWork = 0
    // 초기화
    async function init() {
        if (window.currentIndex !== 2) {
            console.log(`Initialization stopped. currentIndex is ${window.currentIndex}`);
            tmWork = 0
            return;
        }
        await loadModels();
        intervalId = setInterval(updateAndClassify, classificationInterval);
    }

    // 웹캠 시작 (페이지 로드와 함께 실행)
    startWebcam();

    // 초기화 시작
    setInterval(() => {
        if (window.currentIndex === 2) {
            init();
        } else {
            console.log(`Skipping initialization. currentIndex is ${window.currentIndex}`);
        }
    }, 1000);
});
