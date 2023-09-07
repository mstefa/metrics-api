


import { ObjectId } from 'mongodb';

import { MongoRepository } from '../../shared/infrastructure/mongo/MongoRepository';
import { Metric } from '../domain/Metric';
import { MetricCriteria } from '../domain/MetricCriteria';
import { MetricRepository } from '../domain/MetricRepository';

interface ArticleDocument {
  _id: ObjectId;
  timestamp: string;
  name: string;
  value: number;
}

export class MongoMetricRepository extends MongoRepository<Metric> implements MetricRepository {
  protected collectionName(): string {
    return 'metric';
  }

  async save(metric: Metric): Promise<void> {
    const collection = await this.collection();
    await collection.insertOne(metric.toPrimitives())

    return
  }

  async search(criteria: MetricCriteria): Promise<Metric[]> {

    const collection = await this.collection();
    const metricDocuments = await collection.find<ArticleDocument>({
      timestamp: {
        $gt: criteria.from.toString(),
        $lt: criteria.to.toString()
      },
      name: { $in: criteria.metricName },
    }).toArray()

    if (metricDocuments.length < 1) {
      return [];
    }

    return metricDocuments.map(document =>
      Metric.fromPrimitives(document.timestamp, document.name, document.value)
    );
  }
}
