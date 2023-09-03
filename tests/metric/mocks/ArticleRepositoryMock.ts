import { Metric } from '../../../src/metric/domain/Metric';
import { MetricRepository } from '../../../src/metric/domain/MetricRepository';
import { Nullable } from '../../../src/shared/domain/Nullable';
import { Uuid } from '../../../src/shared/domain/value-objects/Uuid';

export class MetricRepositoryMock implements MetricRepository {

  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockedMetric: Nullable<Metric> = null;

  async save(metric: Metric): Promise<void> {
    this.mockSave(metric);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search(_id: string): Promise<Nullable<Metric>> {
    return Promise.resolve(this.mockedMetric);

  }

  assertLastSavedMetricIs(expected: Metric): void {
    const mock = this.mockSave.mock;
    const lastSavedArticle = mock.calls[mock.calls.length - 1][0] as Metric;
    expect(lastSavedArticle).toBeInstanceOf(Metric);
    expect(lastSavedArticle).toEqual(expected);
  }

  returnOnSearch(metric: Metric) {
    this.mockedMetric = metric;
  }

  assertSearch(id: Uuid) {
    expect(this.mockSearch).toHaveBeenCalledWith(id);
  }

}