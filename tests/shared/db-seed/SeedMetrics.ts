import { MetricRepository } from "../../../src/metric/domain/MetricRepository";
import { Logger } from "../../../src/shared/infrastructure/logger/Logger";
import { MetricMother } from "../../metric/unit/MetricMother";
import { MetricNameMother } from "../../metric/unit/MetricNameMother";
import { DateMother } from "../entities-mothers/DateMother";


export class SeedMetrics {
  private repository: MetricRepository;

  constructor(repository: MetricRepository) {
    this.repository = repository;
  }

  async run(timestampFrom: Date, timestampTo: Date, elementsQuantity: number): Promise<void> {

    Logger.info('loading random data set...')

    for (let i = 0; i < elementsQuantity; i++) {
      const randomDate = DateMother.between(timestampFrom.toString(), timestampTo.toString())
      const randomName = MetricNameMother.random();
      const randomMetric = MetricMother.randomValues(randomDate, randomName);
      // eslint-disable-next-line no-await-in-loop
      await this.repository.save(randomMetric);

    }

    Logger.info('Data loaded')

  }
}
