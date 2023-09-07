
import { Metric } from '../../../src/metric/domain/Metric';
import { MetricName } from '../../../src/metric/domain/value-objects/MetricName';
import { MetricValue } from '../../../src/metric/domain/value-objects/MetricValue';
import { Timestamp } from '../../../src/shared/domain/value-objects/Timestampt';
import { DateMother } from '../../shared/data-generator/DateMother';
import { NumberMother } from '../../shared/data-generator/NumberMother';
import { MetricNameMother } from './MetricNameMother';

export class MetricMother {

  static random = (): Metric => {

    const article = new Metric(
      new Timestamp(DateMother.past().toISOString()),
      new MetricName(MetricNameMother.random().toString()),
      new MetricValue(NumberMother.random()),
    )

    return article
  }

  static randomValues = (date: Date, name: MetricName): Metric => {

    const article = new Metric(
      new Timestamp(date.toISOString()),
      name,
      new MetricValue(NumberMother.random()),
    )

    return article
  }

}

