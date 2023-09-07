//TODO
import { Timestamp } from "../../shared/domain/value-objects/Timestampt";
import { MetricsAveragesDto } from "../dtos/MetricsAvergaresDto";
import { Metric } from "./Metric";
import { intervalUnitEnum } from "./value-objects/intervalUnit";

export class MetricAveragesService {

  constructor() { }

  calculateAveragePerSecond(from: Timestamp, to: Timestamp, metrics: Metric[]): MetricsAveragesDto {
    const averagePerSecond = new Map<number, { sum: number, count: number }>();

    const currentDate = from.value;

    while (currentDate < to.value) {
      const timestampInSeconds = Math.floor(currentDate.getTime() / 1000)
      averagePerSecond.set(timestampInSeconds, { sum: 0, count: 0 })
      currentDate.setSeconds(currentDate.getSeconds() + 1);
    }

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
      average.metricValues[0].values.push(totalValue.sum / (totalValue.count || 1))
    }

    return average;
  }

  // private groupMetricsByName(metrics: Metric[]): Map<MetricName, Metric[]> {
  //   const metricGroups = new Map<MetricName, Metric[]>();

  //   for (const metric of metrics) {
  //     const name = metric.name;
  //     if (!metricGroups.has(name)) {
  //       metricGroups.set(name, []);
  //     }
  //     metricGroups.get(name)?.push(metric);
  //   }

  //   return metricGroups;
  // }


  // calculateAveragePerSecond(from: Timestamp, to: Timestamp, metrics: Metric[]): MetricsAveragesDto {

  //   const datesArray: Date[] = [];
  //   const currentDate = from.value;

  //   while (currentDate < to.value) {
  //     datesArray.push(new Date(currentDate));
  //     currentDate.setSeconds(currentDate.getSeconds() + 1);
  //   }
  //   const metricGroups: Map<MetricNameEnum, Map<number, { sum: number, count: number }>> = new Map();
  //   console.log('service')
  //   for (const metric of metrics) {

  //     if (!metricGroups.has(metric.name.value)) {
  //       metricGroups.set(metric.name.value, new Map());
  //     }

  //     const timestampInSeconds = Math.floor(metric.timestamp.value.getTime() / 1000); // Convert timestamp to seconds

  //     if (!metricGroups.get(metric.name.value)?.has(timestampInSeconds)) {
  //       metricGroups.get(metric.name.value)?.set(timestampInSeconds, { sum: metric.value.value, count: 1 });
  //     } else {
  //       const currentValue = metricGroups.get(metric.name.value)?.get(timestampInSeconds) || { sum: 0, count: 0 };
  //       console.log('first iterator')
  //       console.log(`sum: ${currentValue.sum}`)
  //       console.log(`count: ${currentValue.count}`)
  //       metricGroups.get(metric.name.value)?.set(timestampInSeconds, { sum: currentValue.sum + metric.value.value, count: currentValue.count + 1 });
  //     }

  //   }

  //   const average: MetricsAveragesDto = {
  //     intervalUnit: intervalUnitEnum.SECOND,
  //     timeValues: datesArray.map(date => date.toISOString()),
  //     metricValues: []
  //   };

  //   for (const [name, nameGroup] of metricGroups.entries()) {
  //     const values: number[] = []
  //     console.log('second iterator')
  //     console.log(datesArray)

  //     datesArray.forEach((date) => {
  //       const timestampInSeconds = Math.floor(date.getTime() / 1000)
  //       const currentValue = nameGroup.get(timestampInSeconds)
  //       values.push(currentValue?.sum || 0 / (currentValue?.count || 1));

  //     })

  //     const metricValue: MetricsAveragesValues = {
  //       name,
  //       values
  //     };

  //     average.metricValues.push(metricValue);

  //   }

  //   return average;
  // }
}
