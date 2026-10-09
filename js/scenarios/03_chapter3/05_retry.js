/* global monogatari */
let scenario_Ch3_TreeGame_Fail = [
  'show character r shy at left',
  'show character ru eyebrow at right',
  'r ‘어떡해! 너무 떨려서 못하겠어!’',
  'r 아, 아까 그, 선물은…….',
  'ru 선물? 스노 글로브 말씀입니까?',
  'r 으응…….', 'r 선물…… 고마워…….', 'r 잘, 간직할게…….',
  'centered [실패 엔딩]', 'hide character ru', 'show character r crying at center',
  'r 히잉…….', 'r 정말로 진짜로 실패해 버렸어!',
  'r 어쩔 수 없지……!', 'r 프로포즈는 내년을 기약할 수밖에……!', 'end',
];
let scenario_Ch3_Retry = [
  function () { this.storage().proposalRetried = true; this.storage().retryRing = null; return true; },
  '그때, 보석상 점원이 등장했다…….',
  'show character r crying at left', 'show character s normal at right',
  's 실례합니다, 레이나님.', 's 레이나 님 앞으로 예약된 상품이',
  's 사실은 하나 더 있었던 것 같습니다만……', 's 한 번 봐 주시지 않겠습니까?',
  'show character r surprised at left', 'r 어?! 저, 정말요?!',
  'show character r energetic at left', 'r 좋아요! 다시 골라볼게요!',
  'proposal-game retry',
  { Conditional: {
    Condition: function () { return this.storage().retryRing; },
    empty: 'jump Ch3_Retry_Empty', candy: 'jump Ch3_Retry_Candy',
    gold: 'jump Ch3_Retry_Gold', diamond: 'jump Ch3_Retry_Diamond',
  } },
];
let scenario_Ch3_Retry_Empty = [
  'centered 안이 텅 빈 반지 상자', 'show character r flustered at left',
  'r 으응?! 아무것도 없는데?', 's 앗, 이런~ 아무것도 없군요!',
  's 제가 착각했나 봅니다~', 's 저는 그럼 이만~', 'hide character s',
  '그렇게 보석상 점원은 떠났다…….', 'centered [실패 엔딩]',
  'show character r crying at center', 'r 히잉…….',
  'r 정말로 진짜로 완전히 실패해 버렸어!', 'r 어쩔 수 없지……!',
  'r 프로포즈는 내년을 기약할 수밖에……!', 'end',
];
function retryProposal(ring, name, destination) {
  return [
    function () { this.storage().ringChoice = ring; return true; },
    `centered 안에 ${name}가 들어 있는 반지 상자`,
    `show character r ${ring === 'diamond' ? 'smile' : 'normal'} at left`,
    ring === 'diamond' ? 'r 이거예요, 틀림없이 이게 맞을 거예요!' : 'r 이게 제가 고른 반지예요!',
    's 자, 여기 있습니다.', 'r 감사합니다.', 'hide character s',
    'show character r energetic at left', 'r ‘좋아, 이걸로 다시 한 번 프로포즈를 해보는 거야……!’',
    'show character r smile at left', 'r 방금은 무효야 무효! 알겠지!?',
    'show character ru smirk at right', 'ru ……예, 그런 걸로 하죠.',
    'show character r closed at left', '레이나가 루퍼스 앞에 한쪽 무릎을 꿇는다.',
    `${name} 상자를 천천히 내밀어 보인다.`, `jump ${destination}`,
  ];
}
let scenario_Ch3_Retry_Candy = retryProposal('candy', '사탕반지', 'Ch3_CandyRing_Fail');
let scenario_Ch3_Retry_Gold = retryProposal('gold', '순금반지', 'Ch3_GoldRing_Fail');
let scenario_Ch3_Retry_Diamond = retryProposal('diamond', '다이아백금반지', 'Ch3_DiamondRing_Success');
