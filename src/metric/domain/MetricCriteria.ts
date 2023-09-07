import { Timestamp } from "../../shared/domain/value-objects/Timestampt";
import { MetricName } from "./value-objects/MetricName";

export class MetricCriteria {
  readonly metricName: MetricName[];
  readonly from: Timestamp;
  readonly to: Timestamp;

  constructor(metricName: MetricName[], from: Timestamp, to: Timestamp) {
    this.metricName = metricName;
    this.from = from;
    this.to = to;
  }

}
