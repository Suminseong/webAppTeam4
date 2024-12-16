const URL = "https://teachablemachine.withgoogle.com/models/8pEgRT5tp/";

let model, video, ctx, canvas;
let poseDownDetected = false;
let consecutivePoseDownCount = 0; // 연속 Pose-down 감지 횟수
let poseDownActionCompleted = false; // Pose-down 감지 후 단 한 번 실행 제한
let poseDownHoldActionCompleted = false; // Pose-down 3회 연속 감지 후 단 한 번 실행 제한

let poseUpDetected = false;
let consecutivePoseUpCount = 0; 
let poseUpActionCompleted = false; 
let poseUpHoldActionCompleted = false; 

document.addEventListener("DOMContentLoaded", () => {
    // 페이지 변경 감지를 위해 hashchange 이벤트 리스너 추가
    window.addEventListener("hashchange", handlePageChange);

    // 추가 웹캠 스트림 초기화
    const webcamIds = ["webcam3", "webcam4", "webcam5"];
    webcamIds.forEach(id => initializeWebcam(id));
});

function handlePageChange() {
    const currentHash = window.location.hash.replace("#", "") || "0";
    const currentIndex = parseInt(currentHash, 10);

    if (currentIndex === 10) {
        // 모델 로드 및 웹캠 초기화
        if (!model) {
            console.log("모델 로드 및 웹캠 초기화 시작");
            init();
        }
    }
}

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        // 모델 로드
        model = await tmPose.load(modelURL, metadataURL);
        console.log("모델이 성공적으로 로드되었습니다.");
    } catch (error) {
        console.error("모델 로드 중 오류가 발생했습니다:", error);
        return;
    }

    // 비디오 및 캔버스 설정
    video = document.getElementById("webcam2");
    canvas = document.getElementById("canvas");

    if (!video || !canvas) {
        console.error("HTML에 <video> 또는 <canvas> 태그가 없습니다.");
        return;
    }

    canvas.width = 920;
    canvas.height = 1100;
    ctx = canvas.getContext("2d");

    const constraints = {
        video: {
            width: 920,
            height: 1100,
            facingMode: "user" // 전면 카메라
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        console.log("웹캠 스트림이 설정되었습니다.");
    } catch (err) {
        console.error("웹캠을 열 수 없습니다:", err.name, err.message);
        return;
    }

    video.addEventListener("loadeddata", () => {
        setInterval(() => {
            loop();
        }, 1000); // 1초 주기로 예측
    });
}

async function loop() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        await predict();
    } else {
        console.error("웹캠 데이터가 충분하지 않습니다.");
    }
}

async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(canvas);

    const currentHash = window.location.hash.replace("#", "") || "0";
    const currentIndex = parseInt(currentHash, 10);

    if (pose) {
        const prediction = await model.predict(posenetOutput);
        const poseDown = prediction.find(p => p.className === "pose-down");
        const poseUp = prediction.find(p => p.className === "pose-up");

        if (currentIndex === 10 && poseDown && poseDown.probability > 0.8 && !poseDownActionCompleted) {
            // Pose-down 감지 시 단 한 번 동작
            console.log("Pose-down 감지됨. 페이지 이동.");
            moveToNextPage();
            poseDownActionCompleted = true; // 동작 제한
        }

        if (currentIndex === 11 && poseDown && poseDown.probability > 0.8) {
            // 연속 Pose-down 감지 횟수 증가
            consecutivePoseDownCount++;
            console.log(`Pose-down 감지 횟수: ${consecutivePoseDownCount}`);
            if (consecutivePoseDownCount >= 5 && !poseDownHoldActionCompleted) {
                console.log("Pose-down 5회 연속 감지됨. 추가 페이지 이동.");
                moveToNextPage();
                poseDownHoldActionCompleted = true; // 동작 제한
                consecutivePoseDownCount = 0; // 카운트 초기화
            }
        } 
        // else {
        //     // Pose-down 감지 실패 시 카운트 초기화
        //     consecutivePoseDownCount = 0;
        // }

        if (currentIndex === 13 && poseUp && poseUp.probability > 0.8 && !poseUpActionCompleted) {
            // Pose-up 감지 시 단 한 번 동작
            console.log("Pose-up 감지됨. 페이지 이동.");
            moveToNextPage();
            poseUpActionCompleted = true; // 동작 제한
        }

        if (currentIndex === 14 && poseUp && poseUp.probability > 0.8) {
            // 연속 Pose-up 감지 횟수 증가
            consecutivePoseUpCount++;
            console.log(`Pose-up 감지 횟수: ${consecutivePoseUpCount}`);
            if (consecutivePoseUpCount >= 5 && !poseUpHoldActionCompleted) {
                console.log("Pose-up 5회 연속 감지됨. 추가 페이지 이동.");
                moveToNextPage();
                poseUpHoldActionCompleted = true; // 동작 제한
                consecutiveUpDownCount = 0; // 카운트 초기화
            }
        }
    } else {
        console.error("Pose 데이터가 생성되지 않았습니다.");
    }
}

function moveToNextPage() {
    const currentHash = window.location.hash.replace("#", "") || "0";
    const nextHash = parseInt(currentHash, 10) + 1;

    poseDownActionCompleted = false;
    poseDownHoldActionCompleted = false;

    window.location.hash = `#${nextHash}`;
    console.log(`페이지 이동: #${nextHash}`);
}

// 추가 웹캠 초기화 함수
function initializeWebcam(webcamId) {
    const videoElement = document.getElementById(webcamId);
    if (!videoElement) {
        console.error(`ID가 ${webcamId}인 비디오 요소를 찾을 수 없습니다.`);
        return;
    }

    const constraints = {
        video: {
            width: 920,
            height: 1100,
            facingMode: "user", // 전면 카메라
        }
    };

    // 웹캠 스트림 설정
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            videoElement.srcObject = stream;
            console.log(`${webcamId} 웹캠 스트림이 설정되었습니다.`);
        })
        .catch((err) => {
            console.error(`${webcamId} 웹캠을 열 수 없습니다:`, err.name, err.message);
        });
}
