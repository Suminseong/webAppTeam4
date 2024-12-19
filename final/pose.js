/*

언어 : Vanila JS
TM 동작하는 영역

*/

const URL = "https://teachablemachine.withgoogle.com/models/8pEgRT5tp/";

let model, video, ctx, canvas;
let poseDownDetected = false;
let consecutivePoseDownCount = 0; // 연속 Pose-down 감지 횟수
let poseDownActionCompleted = false; // Pose-down 감지 후 한번 실행 제한
let poseDownHoldActionCompleted = false; // Pose-down 3회 연속 감지 후 한번 실행 제한

let poseUpDetected = false;
let consecutivePoseUpCount = 0; 
let poseUpActionCompleted = false; 
let poseUpHoldActionCompleted = false; 

document.addEventListener("DOMContentLoaded", () => {
    // 페이지 변경 감지용 이벤트 리스너
    window.addEventListener("hashchange", handlePageChange);

    // 추가 웹캠 스트림 초기화
    const webcamIds = ["webcam3", "webcam4"];
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

/*

인덱스별 모델 불러오기 백업

function updateGuideImgClass() {
    const currentHash = window.location.hash.replace("#", "") || "0";
    const currentIndex = parseInt(currentHash, 10);
    const guideImgs = document.querySelectorAll(".guide-img");

    guideImgs.forEach(img => {
        if (currentIndex === 10 || currentIndex === 13) {
            img.classList.add("fade-in"); // 해시값이 10 또는 13일 경우 클래스 추가
        } else {
            img.classList.remove("fade-in"); // 그렇지 않을 경우 클래스 제거
        }
    });
}
*/

function updateGuideImgClass() {
    const currentHash = window.location.hash.replace("#", "") || "0";
    const currentIndex = parseInt(currentHash, 10);
    const guideImgs = document.querySelectorAll(".guide-img");

    guideImgs.forEach(img => {
        if (currentIndex === 10 || currentIndex === 13) {
            img.classList.add("fade-in"); // 해시값이 10 또는 13일 경우 이미지 점점 선명해지는 클래스 추가
        } else {
            img.classList.remove("fade-in"); // 그렇지 않을 경우 클래스 제거
        }
    });
}

// hashchange 이벤트 리스너에 연결
window.addEventListener("hashchange", updateGuideImgClass);
document.addEventListener("DOMContentLoaded", updateGuideImgClass);

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmPose.load(modelURL, metadataURL);
        console.log("모델이 성공적으로 로드되었습니다.");

    } catch (error) {
        console.error("모델 로드 중 오류가 발생했습니다:", error);
        return;
    }

    video = document.getElementById("webcam2");
    canvas = document.getElementById("canvas");

    if (!video || !canvas) { //오류발생시
        console.error("웹캠 또는 캔버스 영역이 없음.");
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

        if (currentIndex === 10 && poseDown && poseDown.probability > 0.8 && !poseDownActionCompleted) { //10
            // Pose-down 감지 시 한번만 동작
            console.log("Pose-down 감지됨. 페이지 이동.");
            moveToNextPage();
            poseDownActionCompleted = true; // 동작 제한
        }

        if (currentIndex === 11 && poseDown && poseDown.probability > 0.8) { //11
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

        // 안쓰게 된 

        // else {
        //     // Pose-down 감지 실패 시 카운트 초기화
        //     consecutivePoseDownCount = 0;
        // }

        // 안쓰게 된 

        // if (currentIndex === 13 && poseUp && poseUp.probability > 0.8 && !poseUpActionCompleted) { //13
        //     // Pose-up 감지 시 단 한 번 동작
        //     console.log("Pose-up 감지됨. 페이지 이동.");
        //     moveToNextPage();
        //     poseUpActionCompleted = true; // 동작 제한
        // }

        if (currentIndex === 13 && poseUp && poseUp.probability > 0.8) { //14
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

// 웹캠 초기화
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
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            videoElement.srcObject = stream;
            console.log(`${webcamId} 웹캠 스트림이 설정되었습니다.`);
        })
        .catch((err) => {
            console.error(`${webcamId} 웹캠을 열 수 없습니다:`, err.name, err.message);
        });
}
