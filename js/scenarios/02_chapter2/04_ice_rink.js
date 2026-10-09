/* global monogatari */

let scenario_Ch2_IceRink = [
  "centered  아이스링크장",
  "어느덧 완연한 해질녘, 눈사람 장식을 빙 두른 원형의 아이스링크장을 찾은 두 사람.",
  "하지만 이용객은 온데간데 없고, 직원 몇 명만이 남아서 스케이트화를 닦고 있다.",
  "show character r flustered at left",
  "r 저기, 아이스링크장을 이용하고 싶은데요…….",

  "s 죄송합니다. 영업 끝났어요.",
  "s 이브 날에는 저녁 시간 전에 마감하거든요.",

  "show character r depressed at left",
  "r {sad}아아, 이럴 수가…….{/sad}",
  "r {sad}정말 문을 일찍 닫았네…….{/sad}",
  "r {sad}이럴 줄은 상상도 못했어…….{/sad}",

  "show character ru worried at right",
  "ru 괜찮습니다, 레이나.",
  "ru 다음에 오면 되죠.",

  "show character r crying at left",
  "r {sad}‘아니야, 루퍼스……!’{/sad}",
  "r {sad}‘15주년은 다시는 돌아오지 않아……!’{/sad}",

  "show character ru normal at right",
  "ru 내일은 오픈합니까?",

  "s 크리스마스 마켓은 오늘이 마지막 날이에요.",
  "s 아이스링크장 시설도 날이 밝으면 바로 철거할 거고요.",

  "고개를 떨구고 우울해 하는 레이나에게 루퍼스가 다가간다.",
  "루퍼스가 손가락 등으로 레이나의 뺨을 살살 쓸어주자 레이나가 슬며시 고개를 들어올린다.",

  "show character ru soft_smile at right",
  "ru 내일 해가 뜨면 호숫가에 갑시다.",
  "ru 얼음이 두껍게 얼었을 테니, 사람 한두 명쯤 그 위에서 스케이트를 탄다고 무너지진 않겠죠.",
  "ru {happy}그거면 되지 않겠습니까?{/happy}",

  "show character r depressed at left",
  "r 그래도…….",

  "평소라면 그거 좋은 생각이라고 손뼉을 치고 다시 해맑게 웃었을 레이나다.",
  "그런데 오늘은 유달리 기운을 내지 못하고 있다.",
  "루퍼스는 레이나를 가만히 바라보다가 슬쩍 묻는다.",

  "show character ru normal at right",
  "ru {mysterious}이 다음은 뭡니까?{/mysterious}",

  "show character r normal at left",
  "r 응?",

  "ru 이게 끝은 아니었을 것 같은데요.",
  "ru 아이스링크장에서 스케이트를 탄 뒤에는 무엇을 할 계획이었습니까?",
  "ru 그 계획을 계속해서 따라가보는 건 어떨까요.",
  "ru 아직 오늘 하루가 끝나지 않았으니까요.",

  "show character r surprised at left",
  "r {scale}‘……!’{/scale}",
  "r {dreamy}‘그래, 아직 오늘 하루는 끝나지 않았어.’{/dreamy}",
  "show character r energetic at left",
  "r {happy}‘계획했던 것과 아주 약간은 달라졌지만, 아직은 괜찮을 거야!’{/happy}",

  "show character r shy at left",
  "r ……저기.",

  "레이나가 손가락으로 가리킨 곳은, 마켓 가장 안쪽에 설치된 거대한 크리스마스 트리다.",

  "show character r normal at left",
  "r {happy}저곳에 널 데려가고 싶었어.{/happy}",

  "루퍼스가 레이나에게 손을 내민다. 레이나가 반사적으로 맞잡는다.",

  "show character ru soft_smile at right",
  "ru {happy}부디 그래 주시겠습니까.{/happy}",
  "show character r normal at left",
  "r {happy}……응.{/happy}",

  "레이나는 다시 기운을 내어 루퍼스의 손을 꼭 잡고 앞으로 나아간다.",

  "hide character r",
  "hide character ru",

  "jump Ch3_Main", // 제3장(크리스마스 트리)으로 자연스럽게 연결
];

if (typeof window !== "undefined") {
  window.scenario_Ch2_IceRink = scenario_Ch2_IceRink;
}
