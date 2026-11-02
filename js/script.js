/* global monogatari */

// Define the messages used in the game.
monogatari.action("message").messages({
  Help: {
    title: "Help",
    subtitle: "Some useful Links",
    body: `
      <p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
      <p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
    `,
  },
});

// Define the notifications used in the game
monogatari.action("notification").notifications({
  Welcome: {
    title: "Welcome",
    body: "This is the Monogatari VN Engine",
    icon: "",
  },
});

// Define the Particles JS Configurations used in the game
monogatari.action("particles").particles({});

// Define the canvas objects used in the game
monogatari.action("canvas").objects({});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration("credits", {});

// Define the images that will be available on your game's image gallery
monogatari.assets("gallery", {});

// Define the music used in the game.
monogatari.assets("music", {
  Title: "normalized/main-softer/게임 시작 화면 Classic 1985 Movie Soundtrack - Freedom Trail Studio.mp3",
  Daily: "normalized/일상 Blue Dream - Cheel.mp3",
  TreeGame: "normalized/트리게임 The Creepy Clown - Jeremy Korpas.mp3",
  RingGame: "normalized/반지야바위 Jumpin June - The Soundlings.mp3",
  Romance: "normalized/제가 먼저 하려고 했는데, 한 발 늦었군요 Starry Eyed Romance - Biz Baz Studio.mp3",
});

// Define the voice files used in the game.
monogatari.assets("voices", {});

// Define the sounds used in the game.
monogatari.assets("sounds", {});

// Define the videos used in the game.
monogatari.assets("videos", {});

// Define the images used in the game.
monogatari.assets("images", {});

// Define the backgrounds for each scene.
monogatari.assets("scenes", {
  Plaza: "프롤로그 광장.webp",
  WeaponShop: "무기점.webp",
  JewelryShop: "보석상.webp",
  ChristmasMarket: "크리스마스 마켓.webp",
  SouvenirShop: "기념품점.webp",
  BeverageStall: "음료 가판대.webp",
  IceRink: "아이스링크장.webp",
  ChristmasTree: "크리스마스 트리.webp",
  Wedding: "../gallery/결혼씬.webp",
});

// Define the Characters
monogatari.characters({
  r: {
    name: "레이나",
    color: "#ff7675",
    directory: "reina",

    sprites: {
      normal: "레이나_01.webp", // 평범한 표정
      closed: "레이나_02_감은눈.webp", // 눈 감은 표정
      smile: "레이나_03_활짝웃는.webp", // 활짝 웃는 표정
      energetic: "레이나_04_의욕.webp", // 의욕 넘치는 표정
      happy_cry: "레이나_05_행복한눈물.webp", // 행복한 눈물을 흘리는 표정
      shy: "레이나_06_부끄러운얼굴.webp", // 부끄러워하는 표정
      surprised: "레이나_07_놀란얼굴.webp", // 깜짝 놀란 표정
      flustered: "레이나_08_허둥지둥.webp", // 허둥지둥거리는 표정
      crying: "레이나_09_우는얼굴.webp", // 엉엉 우는 표정
      depressed: "레이나_10_우울한.webp", // 우울한 표정
    },
  },

  ru: {
    name: "루퍼스",
    color: "#74b9ff",
    directory: "rufus",

    sprites: {
      normal: "루퍼스_01.webp",
      soft_smile: "루퍼스_03_살짝미소.webp",
      shadowed: "루퍼스_06_그늘진.webp",
      eyebrow: "루퍼스_02_한쪽눈.webp",
      slight_surprised: "루퍼스_05_놀란.webp",
      smirk: "루퍼스_08_피식웃는.webp",
      wry_smile: "루퍼스_09_쓴웃음.webp",
      closed: "루퍼스_04_눈감은.webp",
      worried: "루퍼스_09_쓴웃음.webp", // 별도 걱정 표정은 쓴웃음으로 연결
      angry: "루퍼스_07_화난.webp",
      terrifying: "루퍼스_10_무시무시한표정.webp",
    },

    // expressions: {
    //   normal: "face_normal.png",
    //   soft_smile: "face_soft_smile.png",
    //   shadowed: "face_shadowed.png",
    //   eyebrow: "face_eyebrow.png",
    //   slight_surprised: "face_slight_surprised.png",
    //   smirk: "face_smirk.png",
    //   wry_smile: "face_wry_smile.png",
    //   closed: "face_closed.png",
    //   worried: "face_worried.png",
    //   angry: "face_angry.png",
    //   terrifying: "face_terrifying.png",
    // },

    // default_expression: "normal",
  },

  s: {
    name: "점원",
    color: "#fdcb6e",
    directory: "shopkeeper",

    sprites: {
      normal: "무기 보석상 상인.webp",
      stall: "가판대 상인.webp",
    },

    // expressions: {
    //   normal: "face_normal.png",
    // },

    // default_expression: "normal",
  },

  j: {
    name: "진",
    color: "#a29bfe",
    directory: "jin",

    sprites: {
      surprised: "stand_surprised.webp",
      urgent: "stand_urgent.webp",
    },

    // expressions: {
    //   surprised: "face_surprised.png",
    //   urgent: "face_urgent.png",
    // },

    // default_expression: "surprised",
  },
});

monogatari.script({
  // 프롤로그 시작
  Start:
    typeof scenario_Start !== "undefined"
      ? scenario_Start
      : ["centered 프롤로그", "jump Ch1_Main"],

  // 제1장 분기 선택지
  Ch1_Main: [
    {
      Choice: {
        WeaponShop: { Text: "1번. 무기점", Do: "jump Ch1_WeaponShop_Fail" },
        JewelryShop: { Text: "2번. 보석상", Do: "jump Ch1_JewelryShop_Branch" },
      },
    },
  ],
  Ch1_WeaponShop_Fail:
    typeof scenario_Ch1_WeaponShop_Fail !== "undefined"
      ? scenario_Ch1_WeaponShop_Fail
      : ["centered 1장 무기점 - 실패 엔딩", "end"],
  Ch1_WeaponShop_Choice_Done:
    typeof scenario_Ch1_WeaponShop_Choice_Done !== "undefined"
      ? scenario_Ch1_WeaponShop_Choice_Done
      : ["centered 무기점 선택 이후 시나리오를 찾을 수 없습니다.", "end"],

  Ch1_JewelryShop_Branch:
    typeof scenario_Ch1_JewelryShop_Branch !== "undefined"
      ? scenario_Ch1_JewelryShop_Branch
      : ["centered 1장 보석상 - 다음 장으로 진행", "jump Ch2_Main"],

  // 보석상 반지 선택 후 공통 진행 라벨
  Ch1_JewelryShop_Choice_Done:
    typeof scenario_Ch1_JewelryShop_Choice_Done !== "undefined"
      ? scenario_Ch1_JewelryShop_Choice_Done
      : ["jump Ch2_Main"],

  // 제2장 - 4개 장소를 1 → 2 → 3 → 4 순서로 진행
  Ch2_Main:
    typeof scenario_Ch2_ChristmasMarket !== "undefined"
      ? scenario_Ch2_ChristmasMarket
      : ["centered 2장 크리스마스 마켓", "jump Ch2_SouvenirShop"],

  Ch2_SouvenirShop:
    typeof scenario_Ch2_SouvenirShop !== "undefined"
      ? scenario_Ch2_SouvenirShop
      : ["centered 2장 기념품점", "jump Ch2_BeverageStall"],

  Ch2_BeverageStall:
    typeof scenario_Ch2_BeverageStall !== "undefined"
      ? scenario_Ch2_BeverageStall
      : ["centered 2장 음료 가판대", "jump Ch2_IceRink"],

  Ch2_IceRink:
    typeof scenario_Ch2_IceRink !== "undefined"
      ? scenario_Ch2_IceRink
      : ["centered 2장 아이스링크장", "jump Ch3_Main"],

  // 제3장 크리스마스 트리
  // 여기서는 저장된 선택지를 확인하지 않고, 크리스마스 트리 장면을 먼저 끝까지 진행한다.
  // 실제 엔딩 분기는 01_christmas_tree.js의 마지막 Conditional에서 처리한다.
  Ch3_Main:
    typeof scenario_Ch3_ChristmasTree !== "undefined"
      ? scenario_Ch3_ChristmasTree
      : ["centered 제3장 크리스마스 트리 장면을 불러올 수 없습니다.", "end"],
  Ch3_Proposal: scenario_Ch3_Proposal,
  Ch3_TreeGame_Fail: scenario_Ch3_TreeGame_Fail,
  Ch3_Retry: scenario_Ch3_Retry,
  Ch3_Retry_Empty: scenario_Ch3_Retry_Empty,
  Ch3_Retry_Candy: scenario_Ch3_Retry_Candy,
  Ch3_Retry_Gold: scenario_Ch3_Retry_Gold,
  Ch3_Retry_Diamond: scenario_Ch3_Retry_Diamond,
  Ch3_CandyRing_Fail:
    typeof scenario_Ch3_CandyRing_Fail !== "undefined"
      ? scenario_Ch3_CandyRing_Fail
      : ["centered 3장 사탕반지 엔딩 (실패)", "end"],

  Ch3_GoldRing_Fail:
    typeof scenario_Ch3_GoldRing_Fail !== "undefined"
      ? scenario_Ch3_GoldRing_Fail
      : ["centered 3장 순금반지 엔딩 (실패)", "end"],

  Ch3_DiamondRing_Success:
    typeof scenario_Ch3_DiamondRing_Success !== "undefined"
      ? scenario_Ch3_DiamondRing_Success
      : ["centered 3장 다이아백금반지 엔딩 (성공)", "jump Epilogue"],

  // 에필로그 (결혼식 일러스트 연출 포함)
  Epilogue:
    typeof scenario_Epilogue !== "undefined"
      ? scenario_Epilogue
      : [
          "centered 에필로그",
          // "show scene wedding_bg", // 배경 일러스트 예시
          "end",
        ],
});
