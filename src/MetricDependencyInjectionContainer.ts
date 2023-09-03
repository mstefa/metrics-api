import { MetricCreator } from './metric/application/MetricCreator';
import { MetricController } from './metric/controllers/PostMetricController';
import { MongoMetricRepository } from './metric/infrastructure/MongoMetricRepository';
import { Logger } from './shared/infrastructure/logger/Logger';
import { MongoClientFactory } from './shared/infrastructure/mongo/MongoClientFactory';

// DB
const mongoClient = MongoClientFactory.createClient({ url: 'mongodb://localhost:27017/test' });
const metricRepository = new MongoMetricRepository(mongoClient);

//Aplication
const metricCreator = new MetricCreator(metricRepository);


// Controllers
const postMetricController = new MetricController(metricCreator);

const load = () => {
  Logger.info('  Dependency loaded! \n');
};

export const MetricDependencyInjectionContainer = {
  load,
  mongoClient,
  metricCreator,
  postMetricController,
};
