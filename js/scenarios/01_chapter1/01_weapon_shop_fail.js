/* global monogatari */

let scenario_Ch1_WeaponShop_Fail = [
  "scene square", // 배경 예시 (필요시 수정)
  "centered 정오, 번화가의 가게 앞.",

  "show character r normal at center",
  "r 음, 맞아. 이쪽이었어.",

  "레이나는 무기점으로 향했다.",
  "마음이 조급한 탓일까? 늦지 않았다는 걸 분명 확인했는데도 발걸음이 빠르다.",
  "번화가에 위치한 가게는 겉으로 보기에도 번듯하고 깔끔했다.",

  "r 실례합니다.",

  "s 어서 오세요. 찾으시는 물건이 있으신가요?",

  "r 네! 예약한 물건이 있어서 찾으러 왔어요.",

  "s 성함이 어떻게 되시나요?",

  "r 레이나예요. R로 시작하는.",

  "s 잠시 가게를 둘러보고 계시면 금방 물건을 가져다 드리지요.",

  "r 네. 감사합니다.",

  "검, 창, 방패 같은 냉병기부터 시작해서 최첨단 기술을 적용한 강력한 화기까지.",
  "없는 게 없는 무기점이다.",
  "하지만 레이나 외엔 손님이 한 명도 없다.",

  "r ‘여긴 무척 인기 있는 가게라고 들었는데, 오늘은 텅 비었네.’",
  "r ‘하긴, 크리스마스 이브에 무기를 사러 오는 사람이 많진 않겠지.’",
  "r ‘으음. 그게 내 얘기이긴 하네…….’",

  "show character r shy at center",
  "r 아하핫……. 약간 민망한 것 같기도 하고.",
  "show character r closed at center",
  "r 에이, 아니야.",
  "show character r energetic at center",
  "r 이게 조금 특이한 선물이긴 해도, 받는 사람이 좋아하면 그만이잖아!",
  "r 루퍼스라면 분명 기뻐할 거야.",
  "r 전에 같이 임무를 나갔을 때, 보조 무기가 있으면 좋겠는……. ",
  "show character r shy at center",
  "r 말을, 루퍼스가 직접 하지는 않았지만은……. 그래도 필요하지 않을까?",

  "그때, 점원이 등장했다.",

  "s 죄송합니다, 레이나 님.",
  "s 물건을 빼놓은 도중에 예약자 성함을 적은 꼬리표가 섞여 있었지 뭡니까.",
  "s 다행히 오늘 예약된 물건은 이 두 점 밖에 없는데요.",
  "s 어떤 게 레이나 님의 상품인지 확인해 주실 수 있을까요?",

  {
    Choice: {
      Dialog: "어떤 물건을 고를까?",
      Gun: {
        Text: "1. 권총을 선택",
        Do: "jump Ch1_WeaponShop_Choice_Done",
      },
      Dagger: {
        Text: "2. 단검을 선택",
        Do: "jump Ch1_WeaponShop_Choice_Done",
      },
    },
  },
];

// 선택지 이후 공통으로 이어지는 흐름 라벨
let scenario_Ch1_WeaponShop_Choice_Done = [
  "show character r normal at center",
  "r 음…… 이거! 이게 {bold}제 거{/bold}예요.",
  "r 끝에 빨간색 장식을 달아달라고 요청했거든요.",

  "s 감사합니다. 기록과 대조해보도록 하겠습니다.",
  "s 확인되었습니다! 상품은 쇼핑백에 넣어드릴까요?",

  "r 아뇨, 아뇨. 제가 따로 챙겨갈게요.",
  "show character r smile at center",
  "r {happy}감사해요! 메리 크리스마스!{/happy}",

  "s 손님께서도 즐거운 크리스마스 되시길.",

  "show character r normal at center",
  "레이나는 무기점을 나섰다.",
  "그때 익숙한 실루엣이 눈앞을 스쳐 지나갔다.",

  "show character r surprised at left",
  "r {shake}어? 진이다!{/shake}",
  "r 어딜 저렇게 급하게 가는 걸까?",

  "show character j surprised at right",
  "j 아니, 레이나?! 마침 잘됐다!!",
  "j 혹시 도와줄 수 있을까?!",

  "show character j urgent at right",
  "j {shout}도시 외곽에 사건이 발생했어!!{/shout}",
  "j 시민들을 구조해야 하는데, 함께 가줄래?",

  "show character r flustered at left",
  "r {scared}어어?! 그, 그게, 그치만……!{/scared}",
  "r {shake}나 지금 좀 바쁜데……?!{/shake}",

  "j {shout}부탁할게!!{/shout}",
  "j {bold}도와줄 수 있는 사람이 너밖에 없어!!{/bold}",
  "j 지금 바로 가지 않으면……!!",

  "show character r crying at left",
  "r {shake-hard}{scared}으아아아……!{/scared}{/shake-hard}",
  "r {sad}아, 알겠어……!{/sad}",

  "centered {redacted}실패 엔딩{/redacted}",
  "hide character j",
  "show character r crying at center",
  "r {sad}으으, 실패해 버렸어!{/sad}",
  "r 어쩔 수 없지……!",
  "r {dreamy}프로포즈는 내년을 기약할 수밖에……!{/dreamy}",
  "end",
];

if (typeof window !== "undefined") {
  window.scenario_Ch1_WeaponShop_Fail = scenario_Ch1_WeaponShop_Fail;
  window.scenario_Ch1_WeaponShop_Choice_Done =
    scenario_Ch1_WeaponShop_Choice_Done;
}
