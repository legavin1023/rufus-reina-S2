/* global monogatari */

let scenario_Ch2_BeverageStall = [
  "centered 오후, 음료 가판대.",

  "음료를 파는 가판대에는 다행히 사람이 많이 없었다.",
  "몇 명 되지 않은 직원들이 보글보글 끓는 커다란 냄비를 여러 번 열었다 닫으며 한 국자씩 퍼서 손님들에게 나눠주고 있었다.",

  "show character ru normal at right",
  "ru 메뉴가 생각보다 많은 것 같네요.",
  "ru 레이나가 찾는 코코아가 가장 잘 나가는 것 같습니다만.",

  "show character r normal at left",
  "r 그러게…….",
  "r 설마 이 날씨에 레모네이드를 고르는 사람이 있을까?",

  "show character ru normal at right",
  "ru 없지는 않나 봅니다.",

  "s 다음 손님, 무엇을 드릴까요?",

  "r {happy}저는 코코아 한 잔 주세요.{/happy}",
  "r 루퍼스는 뭐 마실래?",
  "r {happy}이번은 진짜로 내가 살게!{/happy}",

  "show character ru normal at right",
  "ru 뱅쇼라도 한 잔 할까요. 모처럼이니.",

  "show character r normal at left",
  "r 그래. 코코아 한 잔, 뱅쇼 한 잔 주세요.",

  "s 네, 합쳐서 20골드입니다.",

  "그 순간, 루퍼스의 눈빛이 싸늘하게 식었다.",
  "그의 주변으로 은은한 살기가 흘러나온다.",

  "show character ru angry at right",
  "ru {shake-little}고작 음료 두 잔에 20골드?{/shake-little}",

  "ru {angry}장난하십니까?{/angry}",
  "s {scared}히익……! 일종의 보, 보증금이 포함돼 있습니다!{/scared}",

  "s 음료를 다 드시고 머그컵을 반납하시면, 요금 절반을 돌려드려요!",

  "그제서야 루퍼스의 기세가 차분하게 가라앉았다.",
  "곁에서 깜짝 놀랐던 레이나도 {fade}안도의 한숨{/fade}을 내쉰다.",

  "show character ru normal at right",
  "ru 그정도는 괜찮겠네요.",
  "show character ru eyebrow at right",
  "ru 진작 말하지 그러셨습니까.",

  "s {scared}진작 말하려고 했습니다……!{/scared}",

  "두 사람은 점원에게서 묵직한 빨간색 양말 모양 머그컵을 받았다.",
  "레이나의 코코아에는 커다란 마시멜로우를 하나 동동 띄워져 먹음직스러웠다.",
  "루퍼스의 뱅쇼에는 말린 과일 조각과 시나몬 스틱이 담겨져 화사한 향을 냈다.",

  "show character r smile at left",
  "r {happy}으음~! 맛있어……!{/happy}",
  "r {happy}정말 달콤해. 당 충전 제대로야……!{/happy}",

  "show character ru closed at right",
  "ru 이것도 괜찮군요.",
  "ru 그런대로 제값을 하는 맛입니다.",

  "두 사람은 잠시 한적한 곳에 조용히 앉아서 하얀 김이 폴폴 피어오르는 음료를 마셨다.",
  "따뜻한 음료가 들어가니 싸늘했던 몸에 더운 기운이 돌면서 힘이 나는 듯했다.",
  "하늘을 올려다 보니, 루퍼스가 마시는 뱅쇼처럼 붉은 노을이 져 있다.",
  "레이나는 머그컵을 감싸쥔 엄지손가락으로 잔의 입구를 초조하게 문지른다.",
  "그것을 놓칠 루퍼스가 아니었다.",

  "show character ru worried at right",
  "ru ……레이나, 괜찮습니까?",

  "show character r normal at left",
  "r 응? 갑자기 그건 왜 물어?",

  "show character ru worried at right",
  "ru 오늘따라 좀. 생각이 많아 보입니다.",

  "show character r flustered at left",
  "r {shake}‘드, 들켰나?!’{/shake}",
  "r {scared}‘내가 프로포즈를 준비하고 있다는 걸, 알아차린 건가?!’{/scared}",

  "show character ru worried at right",
  "ru 무슨 고민이라도 있는 겁니까?",

  "show character r crying at left",
  "r {sad}‘있어……!’{/sad}",
  "r {sad}‘네가 프로포즈를 받아줄지, 그게 고민이야……!’{/sad}",

  "show character r flustered at left",
  "r 벌써 시간이 이렇게 됐나 해서.",
  "r 내가 알아본 아이스링크장이 근처에 있거든?",
  "r 근데 그렇게 늦은 시간까지 하진 않는다더라고.",
  "r 혹시 일찍 닫을까 봐 그게 불안해서…….",

  "그러자, 루퍼스가 즉시 남은 뱅쇼를 원샷해 버린다.",

  "show character ru normal at right",
  "ru {bold}그렇다면 지금 바로 갑시다.{/bold}",
  "ru 그러면 되는 거 아닌가요.",

  "show character r shy at left",
  "r {happy}그, 그래! 바로 가자!{/happy}",

  "레이나도 벌떡 일어나서 반쯤 식은 코코아를 단번에 마셔 버린다.",
  "곧장 벌벌 떠는 점원에게 돌아가 머그컵을 반납하고 돈을 챙겼다.",
  "두 사람은 함께 아이스링크장으로 향한다.",

  "hide character r",
  "hide character ru",

  "jump Ch2_IceRink", // 다음 장소(아이스링크장)로 자연스럽게 연결
];

if (typeof window !== "undefined") {
  window.scenario_Ch2_BeverageStall = scenario_Ch2_BeverageStall;
}
