/* global monogatari */

let scenario_Start = [
  "centered 정오, 분수가 있는 번화가의 광장.",
  "간밤에 내린 하얀 눈이 길가에 소복이 쌓여 있다.",
  "거리는 온통 붉은색과 초록색으로 크리스마스가 성큼 다가왔음을 한눈에 알 수 있다.",
  "광장을 지나는 사람들은 명절 연휴를 맞아 느긋하게 여유를 즐기고 있다.",

  "{shake}탁탁탁탁……!{/shake}",
  "여기 숨 가쁘게 뛰어가는 한 사람이 있다.",
  "show character r flustered at center",
  "r {shake}{scared}허억, 허억…….{/scared}{/shake} 늦지 않았지?",

  "레이나는 광장의 시계를 확인한다.",
  "현재 시각은 12시 정각이 되기 10분 전.",

  "show character r normal at center",
  "r 휴우, 다행이다. 늦는 줄 알고 식겁했네.",
  "r 생각보다 챙겨야 할 게 많았어…….",
  "r 마지막으로 딱 한 번만 더 확인해 볼까?",
  "r {bold}오늘은 정말 중요한 날이니까.{/bold}",

  "오늘은 12월 24일.",
  "이날은 크리스마스 이브이자, 레이나의 생일.",
  "매해 돌아오는 겹경사날이지만, 오늘은 특히나 더더욱 특별하다.",
  "그 이유는 바로 그녀와 루퍼스가 맺어진지 15년째 되는 날이기 때문이다.",
  "{big}15년.{/big}",
  "단 한 사람만을 아끼고 사랑해온 세월이 레이나의 마음속에 스며들어, 어느덧 하나의 생각으로 빚어졌다.",

  "r {dreamy}‘지금까지의 15년처럼, 앞으로도 평생을 루퍼스와 함께하고 싶어.’{/dreamy}",

  "레이나는 그렇게 간절하게 소망한다.",
  "그리하여 그녀는 어떤 커다란 결심을 하기에 이른다.",
  "단 하나의 승리 플랜을 짜면서…….",

  "r 이것도 챙겼고, 저것도 챙겼고…….",
  "r 좋아. 빼먹은 거 하나도 없어!",
  "r 계획대로 오늘은 정말 최고의 하루를 만들어 보자.",
  "r 모든 게 완벽하게 맞아떨어진다면 루퍼스를 감동시킬 수 있겠지?",
  "r 그렇게만 된다면……!",

  "레이나가 주먹을 불끈 쥐고 기합을 불어넣는다.",
  "show character r energetic at center",
  "r {glow}‘반드시 프로포즈에 성공할 수 있을 거야!’{/glow}",

  "r 먼저 예약해두었던 선물을 챙겨야겠다.",
  "r 거기 위치가, 어디 보자……. 어디에 있다고 했더라?",

  "hide character r",
  {
    Choice: {
      Dialog: "어느 가게로 갈까?",
      WeaponShop: {
        Text: "1. 무기점에 간다",
        Do: "jump Ch1_WeaponShop_Fail",
      },
      JewelryShop: {
        Text: "2. 보석상에 간다",
        Do: "jump Ch1_JewelryShop_Branch",
      },
    },
  },
];

if (typeof window !== "undefined") {
  window.scenario_Start = scenario_Start;
}
