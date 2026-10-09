/* global monogatari */

let scenario_Ch3_ChristmasTree = [
  "centered 밤, 크리스마스 트리 근처.",

  "순식간에 해가 져서 날이 어둑해졌다.",
  "사람들이 길게 줄 서 있던 회전목마는 작동을 멈춘지 오래다.",
  "마켓에 참여한 상인들은 가판대를 정리하고 비품들을 정돈하고 있다.",
  "하지만 마켓 가장 안쪽에 설치한 크리스마스 트리만큼은 밤새도록 환하게 빛날 것이다.",

  "show character r surprised at left",
  "show character ru slight_surprised at right",
  "r {happy}이렇게 큰 크리스마스 트리는 처음 봐.{/happy}",
  "r 이걸 다 치우는 것도 한세월이겠다.",

  "한 차례 코를 훌쩍인 레이나는 목을 한껏 꺾고 트리를 올려다본다.",
  "꼭대기의 커다란 황금 별, 그 아래 칭칭 감은 꼬마 전구가 아름답게 빛을 내고 있다.",
  "루퍼스는 조용히 레이나를 지켜보았다.",
  "그녀가 무엇을 준비했는지 알고 있는 걸까.",
  "적어도 무언가를 준비했다는 것만큼은 짐작하고 있는 게 틀림없다.",
  "그렇기에 기다리고 있다.",
  "레이나는 작게 심호흡을 하고는, 가방에 한 손을 넣었다.",
  "보지도 않고 손을 더듬어서 정사각형 선물상자를 꼭 쥔다.",

  "show character r shy at left",
  "r 루퍼스, 나 하고 싶은 말이 있어.",
  "r 사실은 마켓이 이렇게 일찍 문을 닫을 줄도 몰랐고…….",
  "r 그래서 생각만큼 분위기가 근사하진 않지만…….",
  "r 그래도 크리스마스 트리는 멋지게 빛나고 있으니까…….",

  "레이나는 두 눈을 한번 꼭 감고는, 팔을 팟! 하고 앞으로 뻗었다.",

  "r {bold}이걸, 받아줄래?!{/bold}",

  "show character ru eyebrow at right",
  "ru ……?",
  "ru 이걸…… 말입니까?",

  "그렇게 말하는 루퍼스의 목소리는 의아함만이 가득했다.",
  "그것이 꼭 거절 같이 들려서, 레이나는 가슴이 와르르 무너지는 것만 같다.",
  "루퍼스가 손바닥 위의 상자를 집어 가져갔다.",
  "레이나가 눈물이 찔끔 나온 채로 눈을 뜨자…….",
  "루퍼스가 스노 글로브를 손에 쥐고 있다.",

  "ru 이건 제가 사드린 선물인데도요.",

  "show character r flustered at left",
  "r {shake}아아앗……!!{/shake}",
  "r {shout}그게 아니야!!{/shout}",

  "상자를 잘못 건넨 것을 확인한 레이나의 얼굴이 빨갛게 익어버린다.",
  "곧이어 고개를 떨구고 울상을 짓는다.",

  "show character r crying at left",
  "r {sad}‘어떡해!! 다른 상자를 꺼냈어!!’{/sad}",
  "r {sad}‘으으, 실패해 버리다니……!’{/sad}",
  "r {sad}‘내년을 기약할 수밖에……!’{/sad}",

  "show character ru smirk at right",
  "ru 혹시 이것 말고 다른 걸 준비한 건 아닙니까?",

  "show character r surprised at left",
  "r {scale}……응?!{/scale}",

  "레이나가 고개를 번쩍 치켜들었다.",
  "루퍼스는 한쪽 손으로 턱을 괴고 짐짓 진지하게 말을 잇는다.",

  "show character ru normal at right",
  "ru 그럴지도 모르겠다는 가능성을 잠깐 생각해 보았습니다.",
  "ru 만일 제가 잘못 생각한 거라면…….",

  "show character r smile at left",
  "r {happy}맞아!! 사실 준비한 건 따로 있어!!{/happy}",

  "이번에는 가방 속의 상자가 맞는지 눈으로 확인한 후에, 조심스럽게 꺼내든다.",
  "기어들어가는 목소리로 수줍게 말하는 레이나.",

  "show character r shy at left",
  "r {shake}한 번만, 다시 하게 해주면 안 될까……?{/shake}",
  "루퍼스는 살짝 눈웃음 짓고는 고개를 끄덕인다.",

  "show character r closed at center",
  "hide character ru",

  "r 후우…….",
  "show character r flustered at center",
  "r ‘으으…… 이번엔 잘해야 해……!’",
  "r ‘으아아, 그렇지만……!! 혹시라도 망치면 어떡하지……!!’",
  "proposal-game tree",
  { Conditional: { Condition: function () { return this.storage().treeGameResult; }, success: "jump Ch3_Proposal", failure: "jump Ch3_TreeGame_Fail" } },
];

let scenario_Ch3_Proposal = [
  "show character r closed at center",
  "r 아니야, 침착하자. 잘할 수 있을 거야.",
  "show character r normal at center",
  "r 있잖아 루퍼스.",
  "r 내가 예전에 그랬었잖아.",
  "r 사랑은 빛나는 것이라고.",
  "r 그 어떤 것과도 견줄 수 없이 반짝반짝 빛이 나서…….",
  "r 한참을 들여다보고 또 보고 싶은 거라고.",
  "show character r closed at center",
  "r 지난 15년 동안 너와 함께하면서…….",
  "r 나는 매일매일 그걸 느꼈어.",
  "r 이 반짝거림이 조금도 사그라들지 않고 언제나와 같기에…….",
  "show character r shy at center",
  "r 한참이 아니라, 평생을.",
  "r 곁에 두고두고 함께 보고 싶다고 생각했어.",
  "레이나가 루퍼스 앞에 한 쪽 무릎을 꿇는다.",
  "떨리는 손으로 조심스럽게, 정사각형 상자의 뚜껑을 열어보인다.",
  {
    // 여기서 처음으로 앞에서 저장해 둔 반지 선택에 따라 엔딩을 결정한다.
    Conditional: {
      Condition: function () {
        const choice = this.storage().ringChoice;

        if (choice === "gold") {
          return "gold";
        }

        if (choice === "diamond") {
          return "diamond";
        }

        if (choice === "candy") {
          return "candy";
        }

        // 선택값이 없거나 잘못된 경우의 안전한 기본값
        return "candy";
      },

      gold: "jump Ch3_GoldRing_Fail",
      diamond: "jump Ch3_DiamondRing_Success",
      candy: "jump Ch3_CandyRing_Fail",
    },
  },
];

if (typeof window !== "undefined") {
  window.scenario_Ch3_ChristmasTree = scenario_Ch3_ChristmasTree;
}
