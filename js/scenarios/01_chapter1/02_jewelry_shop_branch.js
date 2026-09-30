/* global monogatari */

window.scenario_Ch1_JewelryShop_Branch = [
  "scene square",
  "centered 정오, 번화가의 가게 앞.",

  "show character r normal at center",
  "r 음, 맞아. 이쪽이었어.",

  "레이나는 보석상으로 향했다.",
  "마음이 조급한 탓일까? 늦지 않았다는 걸 분명 확인했는데도 발걸음이 빠르다.",
  "번화가에 위치한 가게는 겉으로 보기에도 번듯하고 깔끔했다.",

  "r 실례합니다.",

  "s 어서 오세요. 찾으시는 물건이 있으신가요?",

  "r 네! 예약한 물건이 있어서 찾으러 왔어요.",

  "s 성함이 어떻게 되시나요?",

  "r 레이나예요. R로 시작하는.",

  "s 잠시 가게를 둘러보고 계시면 금방 물건을 가져다 드지요.",

  "r 네. 감사합니다.",

  "투명한 유리 전시장 안에 화려한 귀금속 장신구들이 보기 좋게 진열되어 있다.",
  "레이나 말고도 두 명씩 짝지어 방문한 손님들이 여럿 있다.",
  "주변을 둘러보거나 점원의 안내를 받아 장신구를 걸쳐보기도 하는 등, 바빠보인다.",

  "r ‘우와, 역시 인기 있는 가게는 다르구나.’",
  "r ‘크리스마스 이브인데도 사람이 꽤 있어.’",
  "r ‘같이 손을 잡고 장신구를 구경하는 사람들이 많네.’",
  "r {dreamy}‘루퍼스와 함께 와도 좋았겠다.’{/dreamy}",

  "show character r closed at center",
  "r 에이, 아니야.",
  "show character r energetic at center",

  "r {shout}프로포즈는 깜짝 이벤트로 해 주는게 맞지!{/shout}",
  "r 예쁜 반지를 건네주면서 멋지게 청혼하는 거야.",
  "r {dreamy}후후후…….{/dreamy}",
  "r 루퍼스도 감동하지 않고는 못 배길걸?",

  "그때, 점원이 등장했다.",

  "s 죄송합니다, 레이나 님.",
  "s 물건을 빼놓은 도중에 예약자 성함을 적은 꼬리표가 섞여 있었지 뭡니까.",
  "s 다행히 오늘 예약된 물건은 이 세 점 밖에 없는데요.",
  "s 어떤 게 레이나 님의 상품인지 확인해 주실 수 있을까요?",

  // ✨ Do 속성을 배열로 지정하여 선택지 창을 닫고 변수 저장 후 공통 라벨로 이동
  {
    Choice: {
      Dialog: "어떤 반지를 고를까?",

      CandyRing: {
        Text: "1. 사탕반지를 선택",
        // 선택한 반지는 지금 바로 분기하지 않고 storage에만 기록한다.
        onChosen: function () {
          this.storage().ringChoice = "candy";
        },
        Do: "jump Ch1_JewelryShop_Choice_Done",
      },

      GoldRing: {
        Text: "2. 순금반지를 선택",
        // 선택한 반지는 지금 바로 분기하지 않고 storage에만 기록한다.
        onChosen: function () {
          this.storage().ringChoice = "gold";
        },
        Do: "jump Ch1_JewelryShop_Choice_Done",
      },

      DiamondRing: {
        Text: "3. 다이아백금반지를 선택",
        // 선택한 반지는 지금 바로 분기하지 않고 storage에만 기록한다.
        onChosen: function () {
          this.storage().ringChoice = "diamond";
        },
        Do: "jump Ch1_JewelryShop_Choice_Done",
      },
    },
  },
];

window.scenario_Ch1_JewelryShop_Choice_Done = [
  "show character r normal at center",
  "r 음…… 이거! 이게 {bold}제 거{/bold}예요.",
  "r 저희 이니셜을 새겨달라고 요청했거든요.",

  "s 감사합니다. 기록과 대조해보도록 하겠습니다.",
  "s 확인되었습니다! 상품은 쇼핑백에 넣어드릴까요?",

  "r 아뇨, 아뇨. 제가 따로 챙겨갈게요.",
  "show character r smile at center",
  "r {happy}감사해요! 메리 크리스마스!{/happy}",

  "s 손님께서도 즐거운 크리스마스 되시길.",

  "레이나는 보석상을 나섰다.",

  "show character r smile at center",
  "r 이걸로 준비는 완벽해!",

  "show character r closed at center",
  "r {scared}후우, 정말 떨린다.{/scared}",
  "show character r normal at center",
  "r {bold}이제 약속 장소로 가볼까?{/bold}",

  "hide character r",
  "jump Ch2_Main",
];

if (typeof window !== "undefined") {
  window.scenario_Ch1_JewelryShop_Branch = scenario_Ch1_JewelryShop_Branch;
  window.scenario_Ch1_JewelryShop_Choice_Done =
    scenario_Ch1_JewelryShop_Choice_Done;
}
