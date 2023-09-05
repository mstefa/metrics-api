import { InvalidArgumentError } from "../../../shared/domain/error/InvalidArgumentError";

export enum intervalUnitEnum {
  SECOND = 'second',
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
}

export class intervalUnit {
  readonly value: intervalUnitEnum;

  constructor(name: string) {
    if (!intervalUnit.isValidIntervalUnit(name)) {
      throw new InvalidArgumentError(`Interval Unit <${name}> is not listed as a valid Interval Unit`);
    }
    this.value = name as intervalUnitEnum;
  }

  toString(): string {
    return this.value;
  }

  private static isValidIntervalUnit(name: string): name is intervalUnitEnum {
    return Object.values(intervalUnitEnum).includes(name as intervalUnitEnum);
  }
}
