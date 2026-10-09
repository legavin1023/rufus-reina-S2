/* global monogatari */

let scenario_Ch3_GoldRing_Fail = [

  "show character r shy at center",
  "r {glow}루퍼스, 나와 결혼해 줄래?{/glow}",

  "모습을 드러낸 것은, 아무 장식 없이 심플한 디자인의 순금 반지다.",
  "황금! 루퍼스의 눈빛에 생기가 돌았다. 그는 뛰어난 눈썰미로 24k임을 단번에 알아본다.",
  "옳거니! 긍정적인 반응을 확인한 레이나가 약간은 우쭐한 기분으로 몇 마디를 얹는다.",
  "루퍼스의 대답을 기다리지도 않고, 긴장과 흥분으로 엉킨 두뇌가 헛소리를 내뱉었다.",

  "r {happy}어때……? 반지 심플하고 괜찮지?{/happy}",
  "show character r shy at center",
  "show character r energetic at center",
  "r {happy}요전날에 보석상에 갔는데, 딱 이걸로 추천을 해주시더라고!{/happy}",
  "r 요새 금값이 엄청 올랐잖아?",
  "r {glow}그게 금 매장량이 한계가 있어서 그런 거래!{/glow}",

  "show character r energetic at left",
  "show character ru eyebrow at right",
  "ru ……레이나?",

  "r {bold}그래서 앞으로도 금값은 오를 날밖에 안 남았다는 거야!{/bold}",
  "r 이거면 여차하면 나중에 우리 집값 삼아도 되겠다 싶어서……!",

  "show character ru shadowed at right",
  "ru …….",

  "레이나가 뒤늦게 정신을 차렸을 땐, 루퍼스의 눈빛이 흉흉하게 변해 있었다.",
  "음료 가판대에서 20골드에 분노했을 때와는 차원이 다른 살기를 줄기줄기 내뿜고 있었다.",

  "show character r surprised at left",
  "r {scared}헙……!{/scared}",

  "show character ru angry at right",
  "ru {shake-hard}……제게 말도 안 하고, 그런 재테크에 손을 대신 겁니까?{/shake-hard}",
  "ru {angry}그런 중요한 결정은, 금전에 관련한 문제는, 저와 함께 의논해주셨으면 합니다.{/angry}",

  "show character ru terrifying at right",
  "ru {terrifying}무엇보다, 어떤 인간이 그런 이상한 소리로 당신을 현혹한 겁니까?{/terrifying}",
  "ru {glitch}가만히 둘 수 없겠군요…….{/glitch}",

  "show character r flustered at left",
  "r {scared}미, 미안……!{/scared}",

  "show character ru normal at right",
  "ru 보석상 위치가 어디죠?",
  "ru 지금 당장 가 보겠습니다.",
  "ru 금방 다녀올 테니, 여기서 잠시 기다리십시오.",

  "hide character ru",
  "그렇게 분노한 루퍼스는 자리를 떠났다…….",

  "centered [실패 엔딩]",
  "show character r crying at center",

  "r {sad}히잉……. 정말로 진짜로 실패해 버렸어!{/sad}",
  "r {sad}어쩔 수 없지……!{/sad}",
  "r {sad}프로포즈는 내년을 기약할 수밖에……!{/sad}",
  { Conditional: { Condition: function () { return this.storage().proposalRetried ? "done" : "retry"; }, done: "end", retry: "jump Ch3_Retry" } },
];

if (typeof window !== "undefined") {
  window.scenario_Ch3_GoldRing_Fail = scenario_Ch3_GoldRing_Fail;
}
