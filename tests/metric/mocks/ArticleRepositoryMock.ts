import { Metric } from '../../../src/metric/domain/Metric';
import { MetricCriteria } from '../../../src/metric/domain/MetricCriteria';
import { MetricRepository } from '../../../src/metric/domain/MetricRepository';

export class MetricRepositoryMock implements MetricRepository {

  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockedMetrics: Metric[] = [];

  async save(metric: Metric): Promise<void> {
    this.mockSave(metric);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(criteria: MetricCriteria): Promise<Metric[]> {
    this.mockSearch(criteria)

    return Promise.resolve(this.mockedMetrics);

  }

  assertLastSavedMetricIs(expected: Metric): void {
    const mock = this.mockSave.mock;
    const lastSavedArticle = mock.calls[mock.calls.length - 1][0] as Metric;
    expect(lastSavedArticle).toBeInstanceOf(Metric);
    expect(lastSavedArticle).toEqual(expected);
  }

  returnOnSearch(metrics: Metric[]) {
    this.mockedMetrics = metrics;
  }

  assertSearch(criteria: MetricCriteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria);
  }

}
