/* global monogatari */

let scenario_Ch2_ChristmasMarket = [
  "centered 오후, 크리스마스 마켓.",

  "이 도시는 크리스마스를 앞두고 지역 축제와 같이 마켓을 연다.",
  "올해도 넓은 공터에 천막을 펼치고 다종다양한 부스와 가판대가 들어서 있다.",
  "밝고 예쁜 꼬마 전구와 큼지막한 크리스마스 장식들을 곳곳에 달아놓고 한껏 분위기를 살렸다.",

  "show character r normal at center",

  "r 여기 근처 같은데…….",

  "r 아! 저기 있다!",
  "show character ru slight_surprised at right",
  "show character r normal at left",

  "r {happy}루퍼스~!{/happy}",

  "ru ……!",
  "ru 레이나.",

  "r 많이 기다렸어?",

  "show character ru smirk at right",
  "ru 전혀요. 방금 왔습니다.",

  "그렇다기엔 루퍼스의 뾰족한 귀 끝이 빨갛다.",
  "show character r normal at center",
  "레이나는 그것을 알아차리고 손을 뻗는다.",

  "r 얍.",
  "r 읏, 차가워.",
  "r 얼마나 일찍 와서 기다렸던 거야.",
  "r 내가 녹여줄게!",

  "show character ru slight_surprised at right",
  "ru ……!",
  "ru 이러실 필요는.",

  "show character r smile at center",
  "r 헤헤. 잠깐이면 돼.",
  "r 내 손 따끈따끈하다구.",

  "show character ru smirk at right",
  "ru 그건 제가 제일 잘 알죠.",

  "이제 됐다 싶었을 즈음, 루퍼스가 레이나의 손등을 감싸 잡는다.",

  "ru 이제 괜찮습니다.",

  "show character r shy at left",
  "r ……으응. 괜찮구나아.",

  "r {scared}으으, 어떡해!{/scared}",
  "r {dreamy}새삼스럽게 가슴이 두근거리고 말았어.{/dreamy}",
  "r {dreamy}어쩜 루퍼스가 웃어줄 때마다 이렇게 된다니까!{/dreamy}",
  "r {dreamy}15년을 함께했는데도 매번…….{/dreamy}",
  "r {dreamy}이 다음 15년이 지나더라도,그때도 이 두근거림은 똑같을까?{/dreamy}",
  "show character r flustered at left",
  "r {shake}치, 침착하자! 벌써부터 이런 생각은 너무 일러!{/shake}",
  "show character r energetic at left",
  "r 지금은 {bold}완벽한 데이트!{/bold} 그것 하나만 생각하자고!",

  "show character r normal at left",
  "r 여기 정말 볼거리가 많다.",
  "r 신기해. 회전목마도 있잖아!",

  "show character ru normal at right",
  "ru 저쪽에 줄을 서 있습니다.",
  "ru 축제 기간 동안 이용료가 무료라서 사람이 몰렸나보군요.",

  "show character r normal at left",
  "r 정말 그러네?",
  "r 우와, 그래도 저렇게 길게 줄을 설 정도면 대체…….",
  "show character r flustered at left",
  "r {shake}……윽, 맞다!{/shake}",

  "r ‘저렇게 긴 줄을 그냥 서서 기다릴 수는 없어!’",
  "r ‘정해진 시간까지 계획한 대로 완벽한 데이트를 해야 하잖아!’",

  "레이나가 어딘가 어색한 웃음소리를 흘린다.",

  "show character r shy at left",
  "r {happy}{shake}아하~하~하…….{/shake}{/happy}",

  "r 첫 순서부터 마냥 줄을 서는 건 재미가 없잖아?",
  "show character r normal at left",
  "r 저건 사람이 빠지는지 지켜보는 게 나을 것 같아.",
  "show character r energetic at left",
  "r 우리 다른 거부터 하자!",

  "show character ru normal at right",
  "ru 무엇이든 따르도록 하죠.",
  "ru 오늘은 당신의 뜻대로 하는 날이라고 하셨으니.",

  "그렇다. 오늘 약속을 잡기에 앞서, 레이나는 호기롭게 선언했다.",
  "오직 그녀만의 힘으로 잊지 못할 데이트를 선사해주겠노라고.",
  "사실은 루퍼스가 데이트 코스를 함께 짜는 도중에 수상함을 눈치챌까 봐, 레이나가 미리 선수를 친 것에 가까웠지만.",
  "그가 사전 계획을 몰라야 진정한 서프라이즈가 되지 않겠는가?",

  "show character r smile at left",
  "r 바로 그거야. 내가 잘 알아왔거든!",
  "r 헤헤, 그러면 제일 먼저……!",
  "show character r energetic at left",
  "r {bold}기념품점에 가보자!{/bold}",
  "r 크리스마스 마켓까지 와서 기념품을 안 사면 섭하지.",
  "r 저쪽에 많이 있다. 저기로 가 보자.",

  "show character ru normal at right",
  "ru 예. 조금 더 바짝 붙으십시오.",
  "ru 사람이 많으니 위험합니다.",

  "show character r normal at left",
  "r 응!",

  "hide character r",
  "hide character ru",

  "jump Ch2_SouvenirShop", // 다음 장소(기념품점)로 자연스럽게 연결
];

if (typeof window !== "undefined") {
  window.scenario_Ch2_ChristmasMarket = scenario_Ch2_ChristmasMarket;
}
