import { InvalidArgumentError } from "../../../shared/domain/error/InvalidArgumentError";

export enum IntervalUnitEnum {
  SECOND = 'second',
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
}

export class IntervalUnit {
  readonly value: IntervalUnitEnum;

  constructor(name: string) {
    if (!IntervalUnit.isValidIntervalUnit(name)) {
      throw new InvalidArgumentError(`Interval Unit <${name}> is not listed as a valid Interval Unit`);
    }
    this.value = name as IntervalUnitEnum;
  }

  toString(): string {
    return this.value;
  }

  private static isValidIntervalUnit(name: string): name is IntervalUnitEnum {
    return Object.values(IntervalUnitEnum).includes(name as IntervalUnitEnum);
  }


  convertToSeconds(): number {
    switch (this.value) {
      case IntervalUnitEnum.SECOND:
        return 1;
      case IntervalUnitEnum.MINUTE:
        return 60;
      case IntervalUnitEnum.HOUR:
        return 3600;
      case IntervalUnitEnum.DAY:
        return 86400;
      default:
        throw new Error('Invalid interval unit');
    }
  }
}
