import { Timestamp } from '../../shared/domain/value-objects/Timestampt';
import { Metric } from '../domain/Metric';
import { MetricRepository } from '../domain/MetricRepository';
import { MetricName } from '../domain/value-objects/MetricName';
import { MetricValue } from '../domain/value-objects/MetricValue';
import { MetricDto } from '../dtos/MetricDto';

export class MetricCreator {
  private repository: MetricRepository;

  constructor(repository: MetricRepository) {
    this.repository = repository;
  }

  async run(data: MetricDto): Promise<void> {
    const metric = new Metric(
      Timestamp.fromString(data.timestamp),
      new MetricName(data.name),
      new MetricValue(data.value),
    );

    await this.repository.save(metric);
  }
}
