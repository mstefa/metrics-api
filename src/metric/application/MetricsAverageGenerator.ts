import { Timestamp } from "../../shared/domain/value-objects/Timestampt";
import { MetricAveragesService } from "../domain/MetricAveragesService";
import { MetricCriteria } from "../domain/MetricCriteria";
import { MetricRepository } from "../domain/MetricRepository";
import { MetricName } from "../domain/value-objects/MetricName";
import { GetMetricsRequestDto } from "../dtos/getMetricsRequestDto";
import { MetricsAveragesDto } from "../dtos/MetricsAvergaresDto";

export class MetricsAverageGenerator {
  private repository: MetricRepository;
  private service: MetricAveragesService

  constructor(repository: MetricRepository) {
    this.repository = repository;
    this.service = new MetricAveragesService();
  }

  async run(requestDto: GetMetricsRequestDto): Promise<MetricsAveragesDto> {

    const name = requestDto.names.map(name => new MetricName(name))
    const fromTimestamp = new Timestamp(requestDto.from)
    const toTimestamp = new Timestamp(requestDto.to)

    const metrics = await this.repository.search(
      new MetricCriteria(name, fromTimestamp, toTimestamp)
    )

    const metricsByName = this.service.groupMetricsByName(metrics)
    const baseTimeline = this.service.generateBaseTimeline(fromTimestamp, toTimestamp);
    const metricsTimelines = this.service.calculateMetricsAverage(baseTimeline, metricsByName);

    return this.service.mapValuesToAverageDto(baseTimeline, metricsTimelines)

  }
}
