import { MetricsAveragesDto } from "../dtos/MetricsAvergaresDto";
import { Metric } from "./Metric";
import { IntervalUnitEnum } from "./value-objects/IntervalUnit";

export class MetricAveragesService {
  //private repository: Repository;

  constructor(/**repository: repository*/) {
    //this.repository = repository;
  }

  async run(): Promise<void> { }

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

    // Calculate the average for each second
    // for (const [timestampInSeconds, totalValue] of averagePerSecond.entries()) {
    //   const count = metrics.filter((metric) =>
    //     Math.floor(metric.timestamp.getTime() / 1000) === timestampInSeconds
    //   ).length;
    //   const average = totalValue / count;
    //   averagePerSecond.set(timestampInSeconds, average);
    // }

    const average: MetricsAveragesDto = {
      intervalUnit: IntervalUnitEnum.SECOND,
      timeValues: [],
      metricValues: [
        {
          name: metrics[0].name.value,
          values: []
        }
      ]
    };


    for (const [timestampInSeconds, totalValue] of averagePerSecond.entries()) {
      average.timeValues.push(timestampInSeconds.toString())
      average.metricValues[0].values.push(totalValue.sum / totalValue.count)
    }

    return average;
  }

}
