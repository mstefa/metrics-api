import { MongoClient } from 'mongodb';

import { MetricCreator } from './metric/application/MetricCreator';
import { MetricsAverageGenerator } from './metric/application/MetricsAverageGenerator';
import { GetMetricsController } from './metric/controllers/GetMetricsController';
import { PostMetricController } from './metric/controllers/PostMetricController';
import { MongoMetricRepository } from './metric/infrastructure/MongoMetricRepository';
import { config } from './shared/config/appConfig';
import { Logger } from './shared/infrastructure/logger/Logger';
import { MongoClientFactory } from './shared/infrastructure/mongo/MongoClientFactory';


export class DependencyContainer {

  // eslint-disable-next-line no-use-before-define
  private static instance: DependencyContainer;

  public mongoClient: Promise<MongoClient>;

  public metricRepository: MongoMetricRepository;

  // //Aplication
  public metricCreator: MetricCreator;
  public metricGetter: MetricsAverageGenerator;


  // // Controllers
  public postMetricController: PostMetricController;
  public getMetricsController: GetMetricsController;

  constructor() {

    const url = `${config.db.host}/${config.app.env}`;
    this.mongoClient = MongoClientFactory.createClient({ url });

    this.metricRepository = new MongoMetricRepository(this.mongoClient);

    //Aplication
    this.metricCreator = new MetricCreator(this.metricRepository);
    this.metricGetter = new MetricsAverageGenerator(this.metricRepository)


    // Controllers
    this.postMetricController = new PostMetricController(this.metricCreator);
    this.getMetricsController = new GetMetricsController(this.metricGetter)

    Logger.info(`  Environment stetted as: ${config.app.env}`)
    Logger.info('  Dependency loaded! \n');

  }

  static getInstance(): DependencyContainer {

    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }

    return DependencyContainer.instance;
  }

}


// export this.MetricDependencyInjectionContainer = {
//   load
// };
