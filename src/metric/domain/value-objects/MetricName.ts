import { InvalidArgumentError } from "../../../shared/domain/error/InvalidArgumentError";

export enum MetricNameEnum {
  RESPONSE_TIME = 'response_time',
  CPU_USAGE = 'cpu_usage',
  MEMORY_USAGE = 'memory_usage',
}

export class MetricName {
  readonly value: MetricNameEnum;

  constructor(name: string) {
    if (!MetricName.isValidMetricName(name)) {
      throw new InvalidArgumentError(`Name <${name}> is not listed as a valid Metric Name`);
    }
    this.value = name as MetricNameEnum;
  }

  toString(): string {
    return this.value;
  }

  private static isValidMetricName(name: string): name is MetricNameEnum {
    return Object.values(MetricNameEnum).includes(name as MetricNameEnum);
  }
}
