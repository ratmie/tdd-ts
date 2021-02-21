export class Money implements Expression {
  protected _amount: number;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    this._amount = amount;
    this._currency = currency;
  }
  times(multiplier: number): Money {
    return new Money(this._amount * multiplier, this._currency);
  }
  equals(object: Money): boolean {
    return (
      this._amount === object._amount && this._currency === object._currency
    );
  }
  plus(added: Money): Expression {
    return new Sum(this, added);
  }
  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }
  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }
  get amount(): number {
    return this._amount;
  }
  get currency(): string {
    return this._currency;
  }
}

export interface Expression {}

export class Bank {
  reduce(source: Expression, to: string): Money {
    const sum = source as Sum;
    return sum.reduce(to);
  }
}

export class Sum implements Expression {
  augend: Money;
  added: Money;
  constructor(augend: Money, added: Money) {
    this.augend = augend;
    this.added = added;
  }
  reduce(to: string): Money {
    const amount = this.augend.amount + this.added.amount;
    return new Money(amount, to);
  }
}
