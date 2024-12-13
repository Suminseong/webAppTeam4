const URL = "https://teachablemachine.withgoogle.com/models/P02yfej5T/";

let model, webcam, ctx;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 모델 로드
    model = await tmPose.load(modelURL, metadataURL);

    // 웹캠 설정
    const size = 400;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();

    // 캔버스 설정
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext("2d");

    // 업데이트 루프
    setInterval(() => {
        loop();
    }, 200);
}

async function loop() {
    webcam.update();
    await predict();
}

async function predict() {
    const { pose } = await model.estimatePose(webcam.canvas);

    // 스켈레톤 그리기
    if (pose) {
        const minPartConfidence = 0.5;
        ctx.drawImage(webcam.canvas, 0, 0);
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
}

window.onload = init;
