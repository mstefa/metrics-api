import { MongoMetricRepository } from './src/metric/infrastructure/MongoMetricRepository';
import { Logger } from './src/shared/infrastructure/logger/Logger';
import { MongoClientFactory } from './src/shared/infrastructure/mongo/MongoClientFactory';
import { SeedMetrics } from './tests/shared/db-seed/SeedMetrics'

// DB
const mongoClient = MongoClientFactory.createClient({ url: 'mongodb://localhost:27017/local' });
const metricRepository = new MongoMetricRepository(mongoClient);

const intervaleTimeDateInMilliseconds = 10 * 60 * 60 * 1000;
const dateTo = new Date()

const dateFrom = new Date(dateTo.getTime() - intervaleTimeDateInMilliseconds)

const utility = new SeedMetrics(metricRepository)

Logger.info('loading data on test DB')

async function run() {

  await utility.run(dateFrom, dateTo, intervaleTimeDateInMilliseconds / 100);


  (await mongoClient).close(true)
}



run();
