import { EntityNotFoundError } from "../../shared/domain/error/EntityNotFoundError";
import { Timestamp } from "../../shared/domain/value-objects/Timestampt";
import { MetricAveragesService } from "../domain/MetricAveragesService";
import { MetricCriteria } from "../domain/MetricCriteria";
import { MetricRepository } from "../domain/MetricRepository";
import { MetricName } from "../domain/value-objects/MetricName";
import { MetricsAveragesDto } from "../dtos/MetricsAvergaresDto";

export class MetricsAverageGenerator {
  private repository: MetricRepository;
  private service: MetricAveragesService

  constructor(repository: MetricRepository) {
    this.repository = repository;
    this.service = new MetricAveragesService();
  }

  async run(id: string[]): Promise<MetricsAveragesDto> {

    const metrics = await this.repository.search(
      new MetricCriteria(new MetricName('cpu_usage'),
        Timestamp.fromString('2022-09-03T15:45:23.211Z'),
        Timestamp.fromString('2023-09-04T11:45:23.000Z'))
    )

    if (metrics === null) {
      throw new EntityNotFoundError(`Not implemented ID: ${id}`)
    }
    console.log(metrics)

    const response = this.service.calculateAveragePerSecond(metrics);


    return response;
  }
}
