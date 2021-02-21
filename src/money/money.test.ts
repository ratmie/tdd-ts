import { Money, Expression, Bank, Sum } from ".";
/*
TODOリスト
- $5 + 10 CHF = $10（レートが2:1の場合）
- $5 + $5 = $10
- $5 + $5 がMoneyを返す
- [x] $5 * 2 = $10
- [x] amountをprivateにする
- [x] Dollarの副作用どうする？
- Moneyの丸め処理どうする？”
- [x] equals()
- hashCode()
- nullとの比較
- 他オブジェクトとの比較
- [x] 5chf *2 = 10chf
- DollarとFrancの重複
- [x] equalsの一般化
- timesの一般化
- [x] francとdollarの比較
- [x] 通貨の概念
*/
describe("money test", () => {
  it("maultiplication", () => {
    const five: Money = Money.dollar(5);
    expect(five.times(2).equals(Money.dollar(10))).toBe(true);
    expect(five.times(3).equals(Money.dollar(15))).toBe(true);
  });

  describe("等価判定", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true);
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false);

    it("francとdollarの比較", () => {
      expect(Money.dollar(5).equals(Money.franc(5))).toBe(false);
    });
  });

  it("Francの掛け算", () => {
    const five: Money = Money.franc(5);
    expect(five.times(2).equals(Money.franc(10))).toBe(true);
    expect(five.times(3).equals(Money.franc(15))).toBe(true);
  });

  it("通貨の取得", () => {
    expect(Money.dollar(1).currency).toBe("USD");
    expect(Money.franc(1).currency).toBe("CHF");
  });

  it("通貨の足し算", () => {
    const five = Money.dollar(5);
    const sum: Expression = five.plus(five);
    const bank = new Bank();
    const reduced = bank.reduce(sum, "USD");
    expect(reduced.equals(Money.dollar(10))).toBe(true);
  });

  it("plusがSumを返す", () => {
    const five = Money.dollar(5);
    const result = five.plus(five);
    const sum = result as Sum;
    expect(five.equals(sum.augend)).toBe(true);
    expect(five.equals(sum.added)).toBe(true);
  });

  it("reduce sum", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(Money.dollar(7).equals(result)).toBe(true);
  });
});
