const URL = "https://teachablemachine.withgoogle.com/models/P02yfej5T/"; // 모델 URL

let model, webcam, ctx, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Teachable Machine 모델 로드
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // 웹캠 설정
    const size = 400;
    const flip = true; // 좌우 반전
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();

    // 캔버스 설정
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    document.body.appendChild(canvas);
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");

    // 업데이트 루프
    setInterval(() => {
        loop();
    }, 200);
}

async function loop() {
    webcam.update(); // 웹캠 프레임 업데이트
    await predict(); // 예측 및 스켈레톤 표시
}

async function predict() {
    const { pose } = await model.estimatePose(webcam.canvas);

    // 포즈를 캔버스에 그림
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        if (pose) {
            const minPartConfidence = 0.5; // 최소 신뢰도
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

// 페이지 로드 시 init() 자동 실행
window.onload = init;
