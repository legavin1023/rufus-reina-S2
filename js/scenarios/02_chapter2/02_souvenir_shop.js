/* global monogatari */

let scenario_Ch2_SouvenirShop = [
  "scene souvenir_shop", // 배경 예시 (필요시 수정)
  "centered 오후, 기념품점.",

  "기념품점들이 들어선 구역은 화려한 크리스마스 상품들로 가득 차 있다.",
  "크리스마스 트리를 꾸밀 수 있는 오너먼트들부터 시작해서…….",
  "손가락에 끼워서 인형 놀이를 할 수 있는 루돌프 인형도 있고…….",
  "방문에 걸어놓을 수 있는 둥근 리스 장식과, 작은 인테리어 소품들까지…….",
  "각양각색의 기념품들이 진열돼 있다.",

  "show character ru normal at right",
  "ru 마음에 드는 게 있습니까?",

  "show character r closed at left",
  "r {happy}귀여운 게 너무 많아서 고르기 어려운걸.{/happy}",
  "show character r normal at left",
  "r 으음…… 나느은…… 이거.",

  "레이나가 고른 것은 스노 글로브였다.",
  "손바닥만한 유리구슬 한가운데에는 미니어쳐 크리스마스 트리가 하나.",
  "그 아래에는 귀여운 소년 소녀 한 쌍이 마치 인사하듯이 얼굴을 내밀고 서로 입술을 맞추고 있다.",
  "유리구슬을 흔들면 {glow}글리터 가루가 반짝반짝{/glow} 떨어지며 축복이 내려지는 듯하다.",
  "레이나는 기대에 찬 눈빛으로 그것을 하염없이 내려다 보았다.",

  "r {dreamy}……이걸로 할래.{/dreamy}",
  "r 루퍼스, 너는?",
  "r 갖고 싶은 거 있어?",

  "show character ru eyebrow at right",
  "ru 저 말입니까?",

  "루퍼스는 화려하게 진열된 아기자기한 상품을 흘긋 보았다.",
  "그러다가 초롱초롱 눈을 빛내는 레이나에게로 시선을 옮기고는, 피식 웃는다.",

  "show character ru smirk at right",
  "ru 괜찮습니다. 충분합니다.",

  "show character r normal at left",
  "r 그래? 으으음, 그렇다면야…….",

  "레이나가 아차하는 사이에 루퍼스가 값을 치러버렸다.",
  "구매한 스노 글로브는 정사각형 선물상자에 넣어서 레이나가 받아두었다.",

  "show character r flustered at left",
  "r {shake}으으, 그러지 않아도 됐는데…….{/shake}",
  "r 비싸지 않았어……?",

  "show character ru normal at right",
  "ru 합리적인 지출이었다고 생각합니다.",
  "ru 연말에는 짭잘한 건수가 많기도 하고요.",

  "show character r closed at left",
  "r 그건 그래.",
  "r 이상하게 연말만 되면 현상수배범이 많아지는 것 같아.",
  "r 얌전히 쉬기나 할 것이지.",

  "show character ru smirk at right",
  "ru 덕분에 저희가 돈도 벌고 좋은 거죠.",
  "ru 그러니 걱정하지 마십시오.",

  "show character r normal at left",
  "r {happy}으응. 고마워.{/happy}",

  "문득 레이나가 코를 작게 훌쩍인다.",
  "한겨울 날씨에 줄곧 바깥을 돌아다녀서 그런 듯하다.",
  "화사하게 웃으며 밝게 제안한다.",

  "show character r smile at left",
  "r 우리 따뜻한 음료라도 한 잔 마실까?",
  "r 크리스마스 마켓에서만 파는 코코아가 별미래.",
  "r 그냥 먹는 거랑 또 다른 맛이라더라고!",
  "r 꼭 가보고 싶었어.",

  "show character ru normal at right",
  "ru 그렇게 하죠.",

  "hide character r",
  "hide character ru",

  "jump Ch2_BeverageStall", // 다음 장소(음료 가판대)로 자연스럽게 연결
];

if (typeof window !== "undefined") {
  window.scenario_Ch2_SouvenirShop = scenario_Ch2_SouvenirShop;
}
