import { MetricCreator } from './metric/application/MetricCreator';
import { MetricsAverageGenerator } from './metric/application/MetricsAverageGenerator';
import { GetMetricsController } from './metric/controllers/GetMetricsController';
import { PostMetricController } from './metric/controllers/PostMetricController';
import { MongoMetricRepository } from './metric/infrastructure/MongoMetricRepository';
import { Logger } from './shared/infrastructure/logger/Logger';
import { MongoClientFactory } from './shared/infrastructure/mongo/MongoClientFactory';

// DB
const mongoClient = MongoClientFactory.createClient({ url: 'mongodb://localhost:27017/test' });
const metricRepository = new MongoMetricRepository(mongoClient);

//Aplication
const metricCreator = new MetricCreator(metricRepository);
const metricGetter = new MetricsAverageGenerator(metricRepository)


// Controllers
const postMetricController = new PostMetricController(metricCreator);
const getMetricsController = new GetMetricsController(metricGetter)

const load = () => {
  Logger.info('  Dependency loaded! \n');
};

export const MetricDependencyInjectionContainer = {
  load,
  mongoClient,
  metricCreator,
  postMetricController,
  getMetricsController
};
