/* global monogatari */

let scenario_Ch3_DiamondRing_Success = [

  "show character r shy at center",
  "r {glow}루퍼스, 나와 결혼해 줄래?{/glow}",

  "모습을 드러낸 것은, 투명하고 깨끗한 다이아몬드가 중앙에 박힌 백금 반지다.",
  "다이아몬드! 루퍼스의 눈빛에 생기가 돌았다. 그는 뛰어난 눈썰미로 1등급 2캐럿임을 알아본다.",
  "옳거니! 긍정적인 반응을 확인한 레이나가 약간은 우쭐한 기분으로 몇 마디를 얹으려다가…….",
  "입을 합, 다물었다. 지금은 루퍼스의 대답을 기다릴 때다.",
  "긴장과 흥분이 적절한 떨림으로 변주되면서 가슴은 {shake-little}쿵쾅거리고{/shake-little} 목이 타들어간다.",
  "억겁과도 같았던 기다림 끝에, 루퍼스의 입이 열린다.",

  "show character r shy at left",
  "show character ru shadowed at right",
  "ru ……레이나.",

  "예스일까? 아니면 노?",
  "루퍼스는 좀처럼 말을 잇지 않는다.",
  "숨죽여 기다린 끝에 레이나의 시야에 들어온 것은.",
  "맞은 편에서 똑같이 한 쪽 무릎을 꿇어 앉은 루퍼스였다.",

  "hide character r",
  "show character ru wry_smile at center",
  "ru {dreamy}제가 먼저 하려고 했는데, 한 발 늦었군요.{/dreamy}",

  "루퍼스가 외투 안쪽 주머니에 손을 넣어 정사각형 상자를 꺼내고는, 달칵 뚜껑을 열어보인다.",
  "디자인은 다르지만 분명 레이나가 고른 것과 비슷한 다이아몬드 백금 반지다.",

  "show character ru soft_smile at center",
  "ru {glow}당신보다 가치 있는 것은 이 세상에 없습니다.{/glow}",
  "ru {dreamy}레이나, 당신과 결혼하고 싶습니다.{/dreamy}",
  "ru {bold}{glow}그러니 저와 결혼해 주시겠습니까?{/glow}{/bold}",

  "show character r happy_cry at left",
  "show character ru soft_smile at right",

  "r {happy}……응!{/happy}",
  "r {bold}{happy}예스야, 무조건 예스야!{/happy}{/bold}",

  "centered [성공 엔딩]",

  "r {dreamy}‘처음에 계획했던 완벽한 프로포즈와는 많이 달랐지만…….’{/dreamy}",
  "r {glow}‘완벽하지 않아도 괜찮아!’{/glow}",
  "r {bold}{glow}‘루퍼스와 나는 앞으로 평생 함께니까!’{/glow}{/bold}",

  "hide character r",
  "hide character ru",
  "jump Epilogue", // 에필로그로 자연스럽게 연결
];

if (typeof window !== "undefined") {
  window.scenario_Ch3_DiamondRing_Success = scenario_Ch3_DiamondRing_Success;
}
