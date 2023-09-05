import { Nullable } from '../../shared/domain/Nullable';
import { Metric } from './Metric';
import { MetricCriteria } from './MetricCriteria';

export interface MetricRepository {
  save(metric: Metric): Promise<void>;
  search(criteria: MetricCriteria): Promise<Nullable<Metric[]>>;
}
