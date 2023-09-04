import { IntervalUnitEnum } from "../domain/value-objects/IntervalUnit";

type MetricsAveragesValues = {
  name: string;
  values: number[];
}

export type MetricsAveragesDto = {
  intervalUnit: IntervalUnitEnum;
  timeValues: string[];
  metricValues: MetricsAveragesValues[];

};
