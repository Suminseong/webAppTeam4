$(document).ready(function () {
    const $sectionWrap = $(".section-wrap"); // 섹션 래퍼
    const sectionWidth = 1080; // 섹션 너비
    window.currentIndex = 0; // 현재 섹션 인덱스   

    

    // 섹션 이동 함수
    function moveToSection(index) {
        if (index >= 0 && index < $(".section-wrap section").length) {
            currentIndex = index;
            $sectionWrap.css("transform", `translateX(-${sectionWidth * currentIndex}px)`);
            window.location.hash = `#${currentIndex}`; // URL 해시 업데이트
            updateUI(currentIndex);
        }
    }

    // UI 업데이트 함수
    function updateUI(index) {
        if (index === 0) {
            $("#language-btn-wrap").css("display", "block");
            $("#undo-btn, #next-btn").css("display", "none");
        } else {
            $("#language-btn-wrap").css("display", "none");
            $("#undo-btn, #next-btn").css("display", "block");
        }
    }

    // 체크하기 버튼 클릭 시
    $("#check-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            moveToSection(currentIndex + 1);
        }
    });

    //코스 버튼 클릭 시
    $("#route-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            window.location.href = "index2.html#6"
        }
    });

    // 다음 버튼 클릭 시
    $("#next-btn").on("click", function () {
        if (currentIndex < $(".section-wrap section").length - 1) {
            moveToSection(currentIndex + 1);
        }
    });

    // 이전 버튼 클릭 시
    $("#undo-btn").on("click", function () {
        if (currentIndex > 0) {
            moveToSection(currentIndex - 1);
        }
    });

    // 해시 변경 시 처리
    $(window).on("hashchange", function () {
        const hash = window.location.hash.replace("#", "");
        const index = parseInt(hash, 10);
        if (!isNaN(index)) {
            moveToSection(index);
        }
    });

    // 초기화: 페이지 로드 시 해시 처리
    const initialHash = window.location.hash.replace("#", "");
    const initialIndex = parseInt(initialHash, 10);
    if (!isNaN(initialIndex)) {
        moveToSection(initialIndex);
    } else {
        moveToSection(0); // 기본값
    }


// **현재 섹션 인덱스 가져오기**
function getCurrentIndex() {
    const hash = window.location.hash.replace("#", "");
    const index = parseInt(hash, 10);
    if (!isNaN(index)) {
        return index;
    } else {
        return 1; // 기본값은 1
    }
}

// **UI 업데이트 함수**
function updateStepUI(currentIndex) {

    // 모든 li 스타일 초기화
    // $(".step li").css({
    //     "background-color": "#fff",
    //     "color": "var(--main--color)",
    // });

    // currentIndex에 따라 스타일 및 텍스트 업데이트
    if (currentIndex >= 1 && currentIndex <= 4) {
        // 1~4: 첫 번째 단계 활성화
        // $(".stepOn").css({
        //     "background-color": "var(--main--color)",
        //     "color": "#fff",
        // });
        // $(".step-text").text("장비 체크");
        // $(".step-text").css("transform", "translateX(0px)");
        // $(".stepOn").text("1")
    } else if (currentIndex >= 5 && currentIndex <= 6) {
        // 5~6: 두 번째 단계 활성화
        // $(".stepOn").css({
        //     "background-color": "#fff",
        //     "color": "var(--main--color)",
        // });
        // $(".stepTw").css({
        //     "background-color": "var(--main--color)",
        //     "color": "#fff",
        // });
        // $(".step-text").text("코스 선택");
        // $(".step-text").css("transform", "translateX(80px)");
        // $(".stepOn").html(`<span class="material-symbols-outlined">check_small</span>`)
        // $(".stepOn span").css("fontSize", "32px");
        // $(".stepTw").text("2")

    } else if (currentIndex >= 7 && currentIndex < 15) {
        // 7~15: 세 번째 단계 활성화
        // $(".stepOn").css({
        //     "background-color": "#fff",
        //     "color": "var(--main--color)",
        // });
        // $(".stepTw").css({
        //     "background-color": "#fff",
        //     "color": "var(--main--color)",
        // });
        // $(".stepTh").css({
        //     "background-color": "var(--main--color)",
        //     "color": "#fff",
        // });
        // $(".step-text").text("자세 학습");
        // $(".step-text").css("transform", "translateX(160px)");
        // $(".stepOn").html(`<span class="material-symbols-outlined">check_small</span>`)
        // $(".stepOn span").css("fontSize", "32px");
        // $(".stepTw").html(`<span class="material-symbols-outlined">check_small</span>`)
        // $(".stepTw span").css("fontSize", "32px");
        // $(".stepTh").text("3")
    } else if (currentIndex === 15) {
        // 15: 네 번째 단계 활성화
        // $(".stepOn").css({
        //     "background-color": "#fff",
        //     "color": "var(--main--color)",
        // });
        // $(".stepTw").css({
        //     "background-color": "#fff",
        //     "color": "var(--main--color)",
        // });
        // $(".stepTh").css({
        //     "background-color": "#fff",
        //     "color": "var(--main--color)",
        // });
        // $(".stepFo").css({
        //     "background-color": "var(--main--color)",
        //     "color": "#fff",
        // });
        // $(".step-text").text("준비 완료");
        // $(".step-text").css("transform", "translateX(240px)");
        // $(".stepOn").html(`<span class="material-symbols-outlined">check_small</span>`)
        // $(".stepOn span").css("fontSize", "32px");
        // $(".stepTw").html(`<span class="material-symbols-outlined">check_small</span>`)
        // $(".stepTw span").css("fontSize", "32px");
        // $(".stepTh").html(`<span class="material-symbols-outlined">check_small</span>`)
        // $(".stepTh span").css("fontSize", "32px");
        // $(".stepFo").text("4")
    }
}

// 일괄 Animation.js로 비동기 전환 작업 완료.

// **해시 변경 시 호출되는 함수**
function onHashChange() {
    const currentIndex = getCurrentIndex();
    updateStepUI(currentIndex);
}

// **초기화: 페이지 로드 시 실행**
onHashChange();

// **해시 변경 감지**
$(window).on("hashchange", function () {
    onHashChange();
});

    // 언어별 텍스트 데이터
    const translations = {
        kr: {
            fontFamily: "Noto Sans KR, sans-serif",
            "#check-btn p": "체크하기",
            "#route-btn p": "코스보기",
            "#undo-btn": "이전",
            "#next-btn": "다음",

            "#conB .step-text": "장비 체크",
            "#conC .step-text": "장비 체크",
            "#conD .step-text": "장비 체크",
            "#conE .step-text": "장비 체크",
            "#conF .step-text": "코스 선택",
            "#conG .step-text": "코스 선택",
            "#conH .step-text": "자세 학습",
            "#conI .step-text": "자세 학습",
            "#conJ .step-text": "자세 학습",
            "#conK .step-text": "자세 학습",
            "#conL .step-text": "자세 학습",
            "#conM .step-text": "자세 학습",
            "#conN .step-text": "자세 학습",
            "#conO .step-text": "자세 학습",
            "#conP .step-text": "준비 완료",

            "#conA #title": "즐거운 등산을 위해",
            "#conA #title2": "체크하고 사고 예방하자!",
            "#conB .con-title-text": "장비 체크",
            "#conC .con-title-text": "장비 체크",
            "#conD .con-title-text": "장비 체크 중...",
            "#conE .con-title-text": "장비 체크 완료!",
            "#conF .con-title-text": "코스 선택",
            "#conG .con-title-text": "코스 선택",
            "#conH .con-title-text": "등산 자세 가이드",
            "#conI .con-title-text": "Step 1.",
            "#conJ .con-title-text": "Step 2.",
            "#conK .con-title-text": "Step 2.",
            "#conL .con-title-text": "Step 2.",
            "#conM .con-title-text": "Step 3.",
            "#conN .con-title-text": "Step 3.",
            "#conO .con-title-text": "Step 3.",
            "#conP .con-title-text": "준비 끝!",
            
            "#conB .con-sub-text": "가방, 스틱, 신발 체크를 위해 <br>키오스크 앞에서 옆을 보고 서주세요.",
            "#conC .con-sub-text": "아래의 가이드에 맞춰 서주세요!<br>잠시 뒤 장비 체크가 시작됩니다.",
            "#conD .con-sub-text": "착용하신 장비를 확인하고 있어요.",
            "#conE .con-sub-text": "소지하고 계신 장비를 바탕으로<br>코스를 추천드릴게요!",
            "#conF .con-sub-text": "장비 체크를 통해 얻은 정보로<br>적합한 코스를 제공해 드려요.",
            "#conG .con-sub-text": "추천 코스가 마음에 안드시면,<br>다른 코스를 터치해서 확인해보세요!",
            "#conH .con-sub-text": "올바른 자세로 등산해야<br>안전 사고를 예방할 수 있어요!",
            "#conI .con-sub-text": "등산을 할 때 보폭을 좁게 걸어야<br>체력 관리에 도움이 돼요!",
            "#conJ .con-sub-text": "경사로를 걸을 때 상체를 앞으로 기울여야<br>하체 부상을 줄일 수 있어요!",
            "#conK .con-sub-text": "가이드에 맞춰 자세를 따라해보세요!",
            "#conL .con-sub-text": "잘하셨어요! 그대로 3초간 유지해볼게요!",
            "#conM .con-sub-text": "경사로를 걸을 때 팔을 앞뒤로 힘차게<br>흔들면 조금 더 걷기 편해져요!",
            "#conN .con-sub-text": "가이드에 맞춰 자세를 따라해보세요!",
            "#conO .con-sub-text": "잘하셨어요! 그대로 3초간 유지해볼게요!",
            "#conP .con-sub-text": "안전한 등산을 할 준비를 마쳤어요.<br>즐거운 하루 보내세요!",

            "#con-subA .con-title-text": "신발이 부적합해요!",
            "#con-subA .con-sub-text": "가파르지 않은 산이여도 등산 중에<br>슬리퍼나 구두를 신으면 위험해요!",
            "#con-subB .con-title-text": "가방이 없어요!",
            "#con-subB .con-sub-text": "등산 중 수분 보충이나 응급 상황을<br>대비하여 구급상자를 준비해요.",
            "#con-subC .con-title-text": "등산 스틱이 없어요!",
            "#con-subC .con-sub-text": "넘어짐 방지와 체력 조절을 위해서<br>등산 스틱을 챙기는게 좋아요.",
            "#con-subA .con-title-text": "장비가 필요하신가요?",
            "#con-subA .con-sub-text": "입구에 있는 국립공원사무소에서<br>무료로 장비를 대여해드리고 있어요!",
        },
        en: {
            fontFamily: "Noto Sans KR, sans-serif",
            "#check-btn p": "Check",
            "#route-btn p": "View Course",
            "#undo-btn": "BACK",
            "#next-btn": "NEXT",

            "#conA #title": "For an Enjoyable Hiking",
            "#conA #title2": "Check and Prevent Accidents!",
            "#conB .con-title-text": "Equipment Check",
            "#conC .con-title-text": "Equipment Check",
            "#conD .con-title-text": "Checking Equipment...",
            "#conE .con-title-text": "Equipment Check Completed!",
            "#conF .con-title-text": "Course Selection",
            "#conG .con-title-text": "Course Selection",
            "#conH .con-title-text": "Hiking Posture Guide",
            "#conI .con-title-text": "Step 1.",
            "#conJ .con-title-text": "Step 2.",
            "#conK .con-title-text": "Step 2.",
            "#conL .con-title-text": "Step 2.",
            "#conM .con-title-text": "Step 3.",
            "#conN .con-title-text": "Step 3.",
            "#conO .con-title-text": "Step 3.",
            "#conP .con-title-text": "Ready to Go!",
        
            "#conB .con-sub-text": "To check your bag, stick, and shoes, <br>please stand sideways in front of the kiosk.",
            "#conC .con-sub-text": "Please stand according to the guide below!<br>The equipment check will begin shortly.",
            "#conD .con-sub-text": "We are checking the equipment you are wearing.",
            "#conE .con-sub-text": "Based on the equipment you have,<br>we will recommend a suitable course!",
            "#conF .con-sub-text": "Based on the information obtained from the equipment check,<br>we will provide a suitable course.",
            "#conG .con-sub-text": "If you don't like the recommended course,<br>touch another course to check it out!",
            "#conH .con-sub-text": "You need to hike with the correct posture<br>to prevent safety accidents!",
            "#conI .con-sub-text": "When hiking, take small steps<br>to help manage your stamina.",
            "#conJ .con-sub-text": "When walking on a slope, lean your upper body forward<br>to reduce lower body injuries.",
            "#conK .con-sub-text": "Follow the guide and mimic the posture!",
            "#conL .con-sub-text": "Great job! Hold it for 3 seconds!",
            "#conM .con-sub-text": "When walking on a slope, swing your arms<br>vigorously back and forth for easier walking!",
            "#conN .con-sub-text": "Follow the guide and mimic the posture!",
            "#conO .con-sub-text": "Great job! Hold it for 3 seconds!",
            "#conP .con-sub-text": "You’re ready for a safe hike.<br>Have a wonderful day!",

            "#con-subA .con-title-text": "Your Shoes Are Inappropriate!",
            "#con-subA .con-sub-text": "Even on a gentle mountain,<br>it’s dangerous to wear slippers or dress shoes while hiking!",
            "#con-subB .con-title-text": "You Don’t Have a Bag!",
            "#con-subB .con-sub-text": "Prepare a first aid kit to stay hydrated<br>and handle emergencies during the hike.",
            "#con-subC .con-title-text": "You Don’t Have Hiking Sticks!",
            "#con-subC .con-sub-text": "Bring hiking sticks to prevent falls<br>and manage your stamina effectively.",
            "#con-subD .con-title-text": "Do You Need Equipment?",
            "#con-subD .con-sub-text": "You can borrow equipment for free<br>from the National Park Office at the entrance!",
        },
        cn: {
            fontFamily: "Noto Sans SC, sans-serif",
            "#check-btn p": "检查",
            "#route-btn p": "查看",
            "#undo-btn": "上一步",
            "#next-btn": "下一步",

            "#conB .step-text": "设备检查",
            "#conC .step-text": "设备检查",
            "#conD .step-text": "设备检查",
            "#conE .step-text": "设备检查",
            "#conF .step-text": "路线选择",
            "#conG .step-text": "路线选择",
            "#conH .step-text": "姿势学习",
            "#conI .step-text": "姿势学习",
            "#conJ .step-text": "姿势学习",
            "#conK .step-text": "姿势学习",
            "#conL .step-text": "姿势学习",
            "#conM .step-text": "姿势学习",
            "#conN .step-text": "姿势学习",
            "#conO .step-text": "姿势学习",
            "#conP .step-text": "准备完成",
        
            "#conA #title": "享受愉快的登山",
            "#conA #title2": "检查并预防事故！",
            "#conB .con-title-text": "设备检查",
            "#conC .con-title-text": "设备检查",
            "#conD .con-title-text": "正在检查设备...",
            "#conE .con-title-text": "设备检查完成！",
            "#conF .con-title-text": "路线选择",
            "#conG .con-title-text": "路线选择",
            "#conH .con-title-text": "登山姿势指南",
            "#conI .con-title-text": "Step 1.",
            "#conJ .con-title-text": "Step 2.",
            "#conK .con-title-text": "Step 2.",
            "#conL .con-title-text": "Step 2.",
            "#conM .con-title-text": "Step 3.",
            "#conN .con-title-text": "Step 3.",
            "#conO .con-title-text": "Step 3.",
            "#conP .con-title-text": "准备完成！",
                    
            "#conB .con-sub-text": "为了检查包、登山杖和鞋子，<br>请站在信息亭前侧身站立。",
            "#conC .con-sub-text": "按照下面的指南站好！<br>设备检查将会很快开始。",
            "#conD .con-sub-text": "正在确认您所穿的设备。",
            "#conE .con-sub-text": "根据您携带的设备<br>为您推荐合适的路线！",
            "#conF .con-sub-text": "通过设备检查获得的信息，<br>为您提供合适的路线。",
            "#conG .con-sub-text": "如果推荐的路线不满意，<br>请触摸其他路线进行查看！",
            "#conH .con-sub-text": "用正确的姿势登山<br>可以防止安全事故！",
            "#conI .con-sub-text": "登山时步幅应保持小一些，<br>有助于体力管理！",
            "#conJ .con-sub-text": "走陡坡时，身体前倾，<br>可以减少下肢受伤的风险！",
            "#conK .con-sub-text": "按照指南的姿势练习吧！",
            "#conL .con-sub-text": "做得很好！保持这个姿势3秒钟！",
            "#conM .con-sub-text": "走陡坡时，双臂用力前后摆动，<br>会让行走更轻松！",
            "#conN .con-sub-text": "按照指南的姿势练习吧！",
            "#conO .con-sub-text": "做得很好！保持这个姿势3秒钟！",
            "#conP .con-sub-text": "已经为安全登山做好了准备。<br>祝您度过愉快的一天！",
        
            "#con-subA .con-title-text": "您的鞋子不适合登山！",
            "#con-subA .con-sub-text": "即使是缓坡山路，穿拖鞋或皮鞋<br>也很危险！",
            "#con-subB .con-title-text": "您没有背包！",
            "#con-subB .con-sub-text": "请准备急救箱<br>以补充水分和应对紧急情况。",
            "#con-subC .con-title-text": "您没有登山杖！",
            "#con-subC .con-sub-text": "携带登山杖可以防止摔倒<br>并有效管理体力。",
            "#con-subD .con-title-text": "您需要设备吗？",
            "#con-subD .con-sub-text": "您可以在入口处的国家公园办公室<br>免费借用设备！",

        },
        jp: {
            fontFamily: "Noto Sans JP, sans-serif",
            "#check-btn p": "チェックする",
            "#route-btn p": "コースを見る",
            "#undo-btn": "戻る",
            "#next-btn": "次へ",
            
            "#conB .step-text": "装備チェック",
            "#conC .step-text": "装備チェック",
            "#conD .step-text": "装備チェック",
            "#conE .step-text": "装備チェック",
            "#conF .step-text": "コース選択",
            "#conG .step-text": "コース選択",
            "#conH .step-text": "姿勢学習",
            "#conI .step-text": "姿勢学習",
            "#conJ .step-text": "姿勢学習",
            "#conK .step-text": "姿勢学習",
            "#conL .step-text": "姿勢学習",
            "#conM .step-text": "姿勢学習",
            "#conN .step-text": "姿勢学習",
            "#conO .step-text": "姿勢学習",
            "#conP .step-text": "準備完了",
        
            "#conA #title": "楽しい登山のために",
            "#conA #title2": "チェックして事故を防ごう！",
            "#conB .con-title-text": "装備チェック",
            "#conC .con-title-text": "装備チェック",
            "#conD .con-title-text": "装備を確認中...",
            "#conE .con-title-text": "装備チェック完了！",
            "#conF .con-title-text": "コース選択",
            "#conG .con-title-text": "コース選択",
            "#conH .con-title-text": "登山姿勢ガイド",
            "#conI .con-title-text": "Step 1.",
            "#conJ .con-title-text": "Step 2.",
            "#conK .con-title-text": "Step 2.",
            "#conL .con-title-text": "Step 2.",
            "#conM .con-title-text": "Step 3.",
            "#conN .con-title-text": "Step 3.",
            "#conO .con-title-text": "Step 3.",
            "#conP .con-title-text": "準備完了！",
                    
            "#conB .con-sub-text": "バッグ、ストック、靴のチェックのために、<br>キオスクの前で横向きに立ってください。",
            "#conC .con-sub-text": "以下のガイドに従って立ってください！<br>装備チェックがまもなく始まります。",
            "#conD .con-sub-text": "装着されている装備を確認中です。",
            "#conE .con-sub-text": "お持ちの装備を基に<br>コースをおすすめします！",
            "#conF .con-sub-text": "装備チェックで得られた情報を基に<br>適切なコースを提供します。",
            "#conG .con-sub-text": "おすすめのコースが気に入らない場合、<br>他のコースをタッチして確認してください！",
            "#conH .con-sub-text": "正しい姿勢で登山することで、<br>安全事故を防ぐことができます！",
            "#conI .con-sub-text": "登山中は歩幅を狭くすることで、<br>体力管理がしやすくなります！",
            "#conJ .con-sub-text": "傾斜路を歩くときは体を前に傾けることで、<br>下半身の怪我を防ぐことができます！",
            "#conK .con-sub-text": "ガイドに従って姿勢を練習してください！",
            "#conL .con-sub-text": "よくできました！そのまま3秒間キープしてください！",
            "#conM .con-sub-text": "傾斜路を歩くときは腕を力強く前後に振ると、<br>さらに歩きやすくなります！",
            "#conN .con-sub-text": "ガイドに従って姿勢を練習してください！",
            "#conO .con-sub-text": "よくできました！そのまま3秒間キープしてください！",
            "#conP .con-sub-text": "安全な登山の準備が整いました。<br>素敵な一日をお過ごしください！",
        
            "#con-subA .con-title-text": "靴が不適切です！",
            "#con-subA .con-sub-text": "傾斜が緩い山でも、<br>スリッパや革靴を履くと危険です！",
            "#con-subB .con-title-text": "バッグがありません！",
            "#con-subB .con-sub-text": "登山中の水分補給や緊急事態に備えて、<br>救急箱を準備してください。",
            "#con-subC .con-title-text": "登山ストックがありません！",
            "#con-subC .con-sub-text": "転倒防止と体力調整のために、<br>登山ストックを持参するのが良いです。",
            "#con-subD .con-title-text": "装備が必要ですか？",
            "#con-subD .con-sub-text": "入口の国立公園事務所で<br>無料で装備を貸し出しています！",
        },
    };


$("#language-btn-wrap button").on("click", function () {
    const lang = $(this).attr("id"); // 클릭된 버튼 ID (언어 코드)

    

    if (translations[lang]) {
        // 모든 텍스트 업데이트
        $.each(translations[lang], function (selector, text) {
            $(selector).each(function () {
                $(this).html(text);
            });
        });

        // 언어별 con-sub-text의 scale 조정
        if (lang === "en") {
            $(".con-sub-text").css("transform", "scale(0.7)").css("transform-origin", "left top");
        } else if (lang === "jp") {
            $(".con-sub-text").css("transform", "scale(0.9)").css("transform-origin", "left top");
        } else {
            $(".con-sub-text").css("transform", "scale(1)").css("transform-origin", "left top");
        }

        // 폰트 변경
        $(".section-wrap").css("font-family", translations[lang].fontFamily);

        // 버튼 스타일 업데이트
        $("#language-btn-wrap button").removeClass("active");
        $(this).addClass("active");
    }
});



    // 코스 선택 기능
    $(".conF-icon").on("click", function () {
        // 기존 클래스 및 스타일 제거
        $(".course-type").removeClass("course-action").css("opacity", 0);
        $(".conF-icon").removeClass("course-action");

        // 클릭한 버튼에 따라 관련 요소 업데이트.
        if (this.id === "conF-Atype") {
            $(this).addClass("course-action");
            $("#course-easy").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 1s",
            });
            $("#conF-km").html("10km (약 3시간 30분 소요)");
            $("#conF-img").attr("src", "./Img/conG/seonjea.png");
            $("#bottom-modal").css("opacity", "1");
            $("#course-level").text("초급");
            $("#course-level").css("color", "#4ABB74");
            $("#course-name").text("선재산 코스");
            $("#course-name").css("color", "#4ABB74");
        } else if (this.id === "conF-Btype") {
            $(this).addClass("course-action");
            $("#course-normal").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 1s",
            });
            $("#conF-km").html("4.4km (약 2시간 10분 소요)");
            $("#conF-img").attr("src", "./Img/conG/dongdeasan.png");
            $("#bottom-modal").css("opacity", "1");
            $("#course-level").text("중급");
            $("#course-level").css("color", "#4092D2");
            $("#course-name").text("동대산 코스");
            $("#course-name").css("color", "#4092D2");
        } else if (this.id === "conF-Ctype") {
            $(this).addClass("course-action");
            $("#course-hard").addClass("course-action").css({
                opacity: 1,
                transition: "opacity 1s",
            });
            $("#conF-km").html("13.3km (약 7시간 소요)");
            $("#conF-img").attr("src", "./Img/conG/sogum.png");
            $("#bottom-modal").css("opacity", "1");
            $("#course-level").text("상급");
            $("#course-level").css("color", "#3F4BDA");
            $("#course-name").text("소금강산 코스");
            $("#course-name").css("color", "#3F4BDA");
        }
    });
});
