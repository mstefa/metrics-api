import { MongoMetricRepository } from './src/metric/infrastructure/MongoMetricRepository';
import { Logger } from './src/shared/infrastructure/logger/Logger';
import { MongoClientFactory } from './src/shared/infrastructure/mongo/MongoClientFactory';
import { SeedMetrics } from './tests/shared/db-seed/SeedMetrics'

// DB
const mongoClient = MongoClientFactory.createClient({ url: 'mongodb://localhost:27017/test' });
const metricRepository = new MongoMetricRepository(mongoClient);

const intervaleTimeDateInMilliseconds = 5 * 60 * 1000;
const dateFrom = new Date('2023-01-01T12:00:00.000Z')

const timestampTo = new Date(dateFrom.getTime() + intervaleTimeDateInMilliseconds)

const utility = new SeedMetrics(metricRepository)

Logger.info('loading data on test DB')

async function run() {

  await utility.run(dateFrom, timestampTo, intervaleTimeDateInMilliseconds / 100);


  (await mongoClient).close(true)
}



run();
