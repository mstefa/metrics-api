import { Nullable } from '../../shared/domain/Nullable';
import { Metric } from './Metric';

export interface MetricRepository {
  save(metric: Metric): Promise<void>;
  search(id: string): Promise<Nullable<Metric>>;
}
