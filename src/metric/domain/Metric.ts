import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { Timestamp } from '../../shared/domain/value-objects/Timestampt';
import { MetricDto } from '../dtos/MetricDto';
import { MetricName } from './value-objects/MetricName';
import { MetricValue } from './value-objects/MetricValue';

export class Metric extends AggregateRoot {
  constructor(
    readonly timestamp: Timestamp,
    readonly name: MetricName,
    readonly value: MetricValue,
  ) {
    super();
  }

  toPrimitives(): MetricDto {
    return {
      timestamp: this.timestamp.toString(),
      name: this.name.value,
      value: this.value.value,
    };
  }

  static fromPrimitives(
    timestamp: Date,
    name: string,
    value: number,
  ): Metric {
    return new Metric(
      new Timestamp(timestamp),
      new MetricName(name),
      new MetricValue(value),
    );
  }
}
