document.addEventListener('DOMContentLoaded', () => {
    const webcamElement = document.getElementById('webcam');
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');

    // 모델 URL
    const modelURLs = [
        'https://teachablemachine.withgoogle.com/models/D-_XweIDl/', // 스프레이 유무 모델 spray
        'https://teachablemachine.withgoogle.com/models/Tj5nNliIH/', // 카메라 유무 모델 cam
        'https://teachablemachine.withgoogle.com/models/VtN-JwtKg/'  // 우유곽 유무 모델 pac
    ];

    let models = [];

    // 캔버스별 웹캠 범위 설정 (x, y, width, height)
    const canvasAreas = [
        { x: 0, y: 0, width: 320, height: 240 }, // canvas1
        { x: 160, y: 120, width: 320, height: 240 }, // canvas2
        { x: 320, y: 240, width: 320, height: 240 }  // canvas3
    ];

    // 웹캠 시작
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
        } catch (err) {
            console.error('Error accessing webcam:', err);
        }
    }

    // 모델 로드
    async function loadModels() {
        for (const url of modelURLs) {
            const model = await tmImage.load(url + 'model.json', url + 'metadata.json');
            models.push(model);
        }
        console.log('Models loaded');
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

            // 지정된 범위를 잘라 캔버스에 그리기
            ctx.drawImage(
                webcamElement,
                area.x, area.y, area.width, area.height, // 웹캠의 자를 영역
                0, 0, canvas1.width, canvas1.height      // 캔버스에 맞게 그리기
            );

            if (index === 1) ctx.filter = 'grayscale(100%)';
            if (index === 2) ctx.filter = 'invert(100%)';
        });

        classifyFrame(canvas1, models[0], 'result1');
        classifyFrame(canvas2, models[1], 'result2');
        classifyFrame(canvas3, models[2], 'result3');

        requestAnimationFrame(updateAndClassify);
    }

    // 분류 수행
    async function classifyFrame(canvas, model, resultElementId) {
        const prediction = await model.predict(canvas);
        console.log(prediction);

        // 가장 높은 확률의 클래스명 가져오기
        const highestPrediction = prediction.reduce((prev, current) =>
            (prev.probability > current.probability) ? prev : current
        );

        // 결과 HTML 업데이트
        document.getElementById(resultElementId).innerText = highestPrediction.className;
    }

    // 초기화
    async function init() {
        await startWebcam();
        await loadModels();
        updateAndClassify();
    }

    init();
});
