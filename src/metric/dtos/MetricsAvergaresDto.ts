import { IntervalUnitEnum } from "../domain/value-objects/IntervalUnit";
import { MetricNameEnum } from "../domain/value-objects/MetricName";

export type MetricsAveragesValues = {
  name: MetricNameEnum;
  values: number[];
}

export type MetricsAveragesDto = {
  intervalUnit: IntervalUnitEnum;
  timeValues: string[];
  metricValues: MetricsAveragesValues[];

};
