import { MetricsAveragesDto } from "../dtos/MetricsAvergaresDto";
import { Metric } from "./Metric";
import { intervalUnitEnum } from "./value-objects/intervalUnit";

export class MetricAveragesService {

  constructor() { }

  calculateAveragePerSecond(metrics: Metric[]): MetricsAveragesDto {
    const averagePerSecond = new Map<number, { sum: number, count: number }>();

    for (const metric of metrics) {
      const timestampInSeconds = Math.floor(metric.timestamp.value.getTime() / 1000); // Convert timestamp to seconds
      // TODO: use time with rounded second
      if (!averagePerSecond.has(timestampInSeconds)) {
        averagePerSecond.set(timestampInSeconds, { sum: metric.value.value, count: 1 });
      } else {
        const currentValue = averagePerSecond.get(timestampInSeconds) || { sum: 0, count: 0 };
        averagePerSecond.set(
          timestampInSeconds,
          { sum: currentValue.sum + metric.value.value, count: currentValue.count + 1 });
      }
    }

    const average: MetricsAveragesDto = {
      intervalUnit: intervalUnitEnum.SECOND,
      timeValues: [],
      metricValues: [
        {
          name: metrics[0].name.value,
          values: []
        }
      ]
    };


    for (const [timestampInSeconds, totalValue] of averagePerSecond.entries()) {
      average.timeValues.push(new Date(timestampInSeconds * 1000).toISOString())
      average.metricValues[0].values.push(totalValue.sum / totalValue.count)
    }

    return average;
  }

}
