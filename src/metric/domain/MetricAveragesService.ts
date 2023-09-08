//TODO
import { Timestamp } from "../../shared/domain/value-objects/Timestampt";
import { MetricsAveragesDto, MetricsAveragesValues } from "../dtos/MetricsAvergaresDto";
import { Metric } from "./Metric";
import { intervalUnitEnum } from "./value-objects/intervalUnit";
import { MetricName, MetricNameEnum } from "./value-objects/MetricName";

type MetricsCountAndSum = Map<number, { sum: number, count: number }>;
type MetricsByName = Map<MetricNameEnum, Metric[]>;
type TimelineBase = {
  key: number;
  date: string;
}
export class MetricAveragesService {

  constructor() { }


  groupMetricsByName(metrics: Metric[]): MetricsByName {
    const metricGroups = new Map<MetricNameEnum, Metric[]>();

    for (const metric of metrics) {
      const name = metric.name.value;
      if (!metricGroups.has(name)) {
        metricGroups.set(name, []);
      }
      metricGroups.get(name)?.push(metric);
    }

    return metricGroups;
  }

  reviewRequestedNames(data: MetricsByName, names: MetricName[]) {
    names.forEach(name => {
      if (!data.has(name.value)) {
        data.set(name.value, [])
      }
    })
  }

  generateBaseTimeline(from: Timestamp, to: Timestamp): TimelineBase[] {

    const timeline: TimelineBase[] = [];
    const currentDate = from.value;

    while (currentDate < to.value) {
      const timestampInSeconds = Math.floor(currentDate.getTime() / 1000)
      timeline.push({
        key: timestampInSeconds,
        date: currentDate.toISOString(),
      })
      currentDate.setSeconds(currentDate.getSeconds() + 1);
    }

    return timeline
  }

  calculateMetricsAverage(baseTimeline: TimelineBase[], metrics: Map<MetricNameEnum, Metric[]>): MetricsAveragesValues[] {

    const metricValue: MetricsAveragesValues[] = [];

    metrics.forEach((metric, index) => {
      const data = this.getMetricsCountAndSum(metric)
      const average = this.generateAverageValues(baseTimeline, data)
      metricValue.push({
        name: index,
        values: average
      })
    })

    return metricValue;
  }


  mapValuesToAverageDto(baseTimeline: TimelineBase[], metrics: MetricsAveragesValues[]): MetricsAveragesDto {
    return {
      intervalUnit: intervalUnitEnum.SECOND,
      timeValues: baseTimeline.map(e => e.date),
      metricValues: metrics
    };
  }

  private getMetricsCountAndSum(metrics: Metric[]) {
    const metricsCountAndSum: MetricsCountAndSum = new Map();
    for (const metric of metrics) {
      const timestampInSeconds = Math.floor(metric.timestamp.value.getTime() / 1000);
      if (!metricsCountAndSum.has(timestampInSeconds)) {
        metricsCountAndSum.set(timestampInSeconds, { sum: metric.value.value, count: 1 });
      } else {
        const currentValue = metricsCountAndSum.get(timestampInSeconds) || { sum: 0, count: 0 };
        metricsCountAndSum.set(
          timestampInSeconds,
          { sum: currentValue.sum + metric.value.value, count: currentValue.count + 1 });
      }
    }

    return metricsCountAndSum;
  }

  private generateAverageValues(baseTimeline: TimelineBase[], metricTimeline: MetricsCountAndSum): number[] {

    const averages: number[] = [];

    baseTimeline.forEach((item) => {
      const value = metricTimeline.get(item.key) || { sum: 0, count: 1 };
      averages.push(value.sum / (value.count))
    })

    return averages;
  }
}
