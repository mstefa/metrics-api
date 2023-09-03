


import { Nullable } from '../../shared/domain/Nullable';
import { MongoRepository } from '../../shared/infrastructure/mongo/MongoRepository';
import { Metric } from '../domain/Metric';
import { MetricRepository } from '../domain/MetricRepository';

// TODO
// interface ArticleDocument {
//   _id: ObjectId;
//   timestamp: Date;
//   name: string;
//   value: number;
// }

export class MongoMetricRepository extends MongoRepository<Metric> implements MetricRepository {
  protected collectionName(): string {
    return 'metric';
  }

  async save(metric: Metric): Promise<void> {
    const collection = await this.collection();
    await collection.insertOne(metric.toPrimitives())

    return
  }

  async search(id: string): Promise<Nullable<Metric>> {
    throw new Error(`Method not implemented: id # ${id}`)
  }
}
