/*

주의

이 파일은 임시로 맹근 테스트용 소스입니다. 
이대로 복붙하면 답없는 결과물 튀어나올 수 있으니 모쪼록 이거 그대로 갖다 쓰지 마시고 각주 잘 읽어가면서 진행해주세요
안그러면 저도 어떻게 못합니다.

*/


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
        { x: 0, y: 0, width: 1280, height: 720 }, // canvas1
        { x: 0, y: 0, width: 1280, height: 720 }, // canvas2
        { x: 0, y: 0, width: 1280, height: 720 }  // canvas3
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
        console.log('Models loaded'); //몇 초 걸리긴 하는데, 그 동안 로딩 페이지 띄우면 될 듯
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
