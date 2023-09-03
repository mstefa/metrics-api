import { InvalidArgumentError } from "../../../shared/domain/error/InvalidArgumentError";

export class MetricValue {
  readonly value: number;

  constructor(value: number) {
    if (isNaN(value)) {
      throw new InvalidArgumentError(`Name <${value}> is not a valid value for a metric`);
    }
    this.value = value;
  }

  toString(): string {
    return this.value.toString();
  }
}
