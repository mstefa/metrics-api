import { MetricRepository } from "../../../../src/metric/domain/MetricRepository";
import { SeedMetrics } from "../../../shared/db-seed/SeedMetrics";

export async function seedDB(_metricRepository: MetricRepository) {

  const intervaleTimeDateInMilliseconds = 5 * 60 * 1000;
  const dateFrom = new Date('2023-01-01T00:00:00.000Z')

  const timestampTo = new Date(dateFrom.getTime() + intervaleTimeDateInMilliseconds)

  const utility = new SeedMetrics(_metricRepository)

  await utility.run(dateFrom, timestampTo, intervaleTimeDateInMilliseconds / 100);

}
