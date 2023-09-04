import { EntityNotFoundError } from "../../shared/domain/error/EntityNotFoundError";
import { MetricRepository } from "../domain/MetricRepository";
import { IntervalUnitEnum } from "../domain/value-objects/IntervalUnit";
import { MetricName } from "../domain/value-objects/MetricName";
import { MetricsAveragesDto } from "../dtos/MetricsAvergaresDto";

export class MetricsGetter {
  private repository: MetricRepository;

  constructor(repository: MetricRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<MetricsAveragesDto> {

    const metrics = await this.repository.search(new MetricName('cpu_usage'))

    if (metrics !== null) {
      throw new EntityNotFoundError(`Not implemented ID: ${id}`)
    }

    return {
      intervalUnit: IntervalUnitEnum.SECOND,
      timeValues: [],
      metricValues:
        [
          {
            name: "cpu_usage",
            values: [],
          }
        ],
    }

  }
}
