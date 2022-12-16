import { addDays, getCurrentDate, getMidnight } from './util-time';

describe('시간 유틸 테스트 모음', () => {
  const now = getCurrentDate();
  it('지금 시각을 KST로 확인할 수 있다.', () => {
    // expect((new Date().getHours() + 9) % 24).toBe(now.getHours());
  });

  it('주어진 시각에서 시간을 더하고 뺄 수 있다.', () => {
    // UTC로 계산하므로 2022/2/1 을 넣으면 2022년 2월 28일 오후 3시가 된다.
    // 편의상 KST 계산을 위해 hours를 9로 설정.
    const std = new Date(2022, 2, 1, 9);
    expect(addDays(std, 3).getDate()).toBe(4);
    expect(addDays(std, -3).getDate()).toBe(26);
  });

  it('KST/UTC 테스트', () => {
    const days = Array.from(Array(20).keys()).map((val) =>
      addDays(getMidnight(getCurrentDate()), val),
    );
    for (const d of days) {
      const minus = d.getDay() > 0 ? 1 - d.getDay() : -6;
    }

    const now = getMidnight(getCurrentDate());
    const minus = now.getDay() > 0 ? 1 - now.getDay() : -6;
    const std = addDays(now, minus);
  });
});
