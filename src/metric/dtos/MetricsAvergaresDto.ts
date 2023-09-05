import { intervalUnitEnum } from "../domain/value-objects/intervalUnit";
import { MetricNameEnum } from "../domain/value-objects/MetricName";

type MetricsAveragesValues = {
  name: MetricNameEnum;
  values: number[];
}

export type MetricsAveragesDto = {
  intervalUnit: intervalUnitEnum;
  timeValues: string[];
  metricValues: MetricsAveragesValues[];

};
