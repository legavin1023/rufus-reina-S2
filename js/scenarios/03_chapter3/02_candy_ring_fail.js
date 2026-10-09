/* global monogatari */

let scenario_Ch3_CandyRing_Fail = [
  "show character r shy at center",
  "r {glow}루퍼스, 나와 결혼해 줄래?{/glow}",

  "모습을 드러낸 것은, 보석 대신 달콤한 보석 모양 사탕이 달린 장난감 반지다.",
  "그것을 본 루퍼스가 작게 풋, 하고 웃음을 터트렸다.",
  "아까보다도 새빨개진 얼굴을 하고서 레이나가 말을 더듬는다.",

  "show character r flustered at center",
  "r {shake}루, 루퍼스가 우, 우, 웃다니! 계획 성공이네!{/shake}",
  "r {happy}절대 잊지 못할 프로포즈를 해 보고 싶었거든!{/happy}",
  "r {bold}세상에 다시는 없을 깜짝 서프라이즈! 어때?!{/bold}",

  "r 게다가 달달한 거 맛있고 좋잖아……!",
  "r 손가락에 끼고 다니다가 심심하면 먹을 수도 있고……!",
  "r {shake}그리고, 그리고 또……!{/shake}",

  "show character r flustered at left",
  "show character ru wry_smile at right",
  "ru {mysterious}레이나…….{/mysterious}",
  "ru {sad}……너무 애쓰지 않아도 됩니다.{/sad}",

  "centered [실패 엔딩]",
  "hide character ru",

  "show character r crying at center",
  "r {sad}히잉……. 정말로 진짜로 실패해 버렸어!{/sad}",
  "r {sad}어쩔 수 없지……!{/sad}",
  "r {sad}프로포즈는 내년을 기약할 수밖에……!{/sad}",
  { Conditional: { Condition: function () { return this.storage().proposalRetried ? "done" : "retry"; }, done: "end", retry: "jump Ch3_Retry" } },
];

if (typeof window !== "undefined") {
  window.scenario_Ch3_CandyRing_Fail = scenario_Ch3_CandyRing_Fail;
}
