
import { Metric } from '../../../src/metric/domain/Metric';
import { MetricName, MetricNameEnum } from '../../../src/metric/domain/value-objects/MetricName';
import { MetricValue } from '../../../src/metric/domain/value-objects/MetricValue';
import { Timestamp } from '../../../src/shared/domain/value-objects/Timestampt';
import { DateMother } from '../../shared/entities-mothers/DateMother';
import { NumberMother } from '../../shared/entities-mothers/NumberMother';
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
    let min: number;
    let max: number;
    switch (name.value) {
      case MetricNameEnum.RESPONSE_TIME:
        min = 5;
        max = 120;
        break
      case MetricNameEnum.CPU_USAGE:
        min = 1;
        max = 100;
        break
      case MetricNameEnum.MEMORY_USAGE:
        min = 0;
        max = 32;
        break
      default:
        min = 1;
        max = 10;
    }

    const article = new Metric(
      new Timestamp(date.toISOString()),
      name,
      new MetricValue(NumberMother.between(min, max)),
    )

    return article
  }

  static generateFakedMetricsGivenTimeAndName(from: Date, to: Date, name: MetricName): { mockedMetrics: Metric[], average: number } {

    const numberOfMockedMetric = Math.floor(NumberMother.random() * 10);
    const mockedMetrics: Metric[] = [];

    for (let i = 0; i <= numberOfMockedMetric; i++) {
      const date = DateMother.between(from, to);
      mockedMetrics.push(MetricMother.randomValues(date, name));
    }

    const average = mockedMetrics.reduce((accumulator: number, currentMetric): number => {
      return accumulator + currentMetric.value.value;

    }, 0) / mockedMetrics.length

    return {
      mockedMetrics,
      average

    }
  }
}

