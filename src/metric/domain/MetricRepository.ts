import { Nullable } from '../../shared/domain/Nullable';
import { Metric } from './Metric';
import { MetricName } from './value-objects/MetricName';

export interface MetricRepository {
  save(metric: Metric): Promise<void>;
  search(name: MetricName): Promise<Nullable<Metric[]>>;
}
