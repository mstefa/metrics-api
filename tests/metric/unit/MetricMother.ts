
import { Metric } from '../../../src/metric/domain/Metric';
import { MetricName } from '../../../src/metric/domain/value-objects/MetricName';
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

    const article = new Metric(
      new Timestamp(date.toISOString()),
      name,
      new MetricValue(NumberMother.random()),
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

