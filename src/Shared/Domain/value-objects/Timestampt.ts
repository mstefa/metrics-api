import { InvalidArgumentError } from '../error/InvalidArgumentError';

export class Timestamp {
  readonly value: Date;
  constructor(date: Date) {
    this.ensureIsAPastDate(date);
    this.value = date;
  }

  toString(): string {
    return this.value.toISOString();
  }

  static fromString(value: string): Timestamp {
    Timestamp.ensureTimestampFormat(value);
    const date = new Date(value);

    return new Timestamp(date)
  }

  static ensureTimestampFormat(str: string): void {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
      throw new InvalidArgumentError(`Date <${str}> is should be on ISO Format`);
    }
  }

  private ensureIsAPastDate(value: Date): void {
    const now = new Date();

    if (value > now) {
      throw new InvalidArgumentError(`<${this.constructor.name}> should be a past date`);
    }
  }
}
