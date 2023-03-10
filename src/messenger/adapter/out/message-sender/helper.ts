export function getSlackIntro() {
  const introTexts = [
    '감사한 고객님! 와우한 고객경험을 드릴게요.',
    '감사한 고객님! 진정성 넘치는 경험을 드리자!',
    '와우! 이 고객님이 있어서 우리가 있다!',
    '소중한 선택을 한 고객님! 더 잘하자!',
    '얏호! 물밀듯이 오시게 하자!',
    '할 수 있다 우리팀!',
    '화이팅! 잘 되고 있다!',
    '우린 할 수 있어!',
    '가자~~~! 더 더 더!',
    '진정성있게! 고객의 삶에 도움이 되게하자!',
    '진정성있게! 더 좋은 제품이 되자!',
    '진정성있게! 꼭 완주하실 수 있게 돕자!',
    '진정성있게! 꼭 목적을 달성하실 수 있도록-!',
    '큰 돈과 시간을 투자해주시는 감사한 고객님!',
    '빠르게! 하나만 한다면 뭘 더 할까?',
    '빠르다! 더 더 더 빠르게 만들자. 간결하게!!!',
    '빠르다! 어떤 것이 이렇게 빠르게 만들었을까?',
    '와우하게! 어떤 교육을 드리면 더 와우할까?',
    '와우하게! 생각지도 못한 경험을 드리자!',
    '압도적인 고객경험을 선사하자!',
    '와우! 꼭 개발자로 거듭나시게 돕자!',
    '최고의 개발자가 되실 수 있도록! 최선을 다하자',
    '10년 후에도 산업에 기여하는 개발자가 되도록!',
  ];
  return introTexts[Math.floor(Math.random() * introTexts.length)];
}
