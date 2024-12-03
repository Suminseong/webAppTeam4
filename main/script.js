/*

모델 웹앱에 구현

*/


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

    // 캔버스별 웹캠 범위 설정 (x, y, width, height)
    // 카메라 해상도에 따라 가변적이니까 하드웨어 폰캠 따라서 잘 노가다 뛰세요^^
    const canvasAreas = [
        { x: 0, y: 135, width: 360, height: 360 }, // canvas1
        { x: 0, y: 70, width: 360, height: 440 }, // canvas2
        { x: 0, y: 220, width: 400, height: 300 }  // canvas3
    ];

    // 웹캠 시작
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
        } catch (err) { //웹캠 연결 없을 때 중단나는 것 예외처리
            console.error('Error accessing webcam:', err);
        }
    }

    // 모델 로드
    async function loadModels() {
        for (const url of modelURLs) {
            const model = await tmImage.load(url + 'model.json', url + 'metadata.json');
            models.push(model);
        }
        console.log('Models loaded'); //제안. 몇 초 걸리긴 하는데, 그 동안 로딩 페이지 띄우면 될 듯
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
