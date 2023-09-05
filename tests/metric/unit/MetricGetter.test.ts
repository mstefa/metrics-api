import { MetricsAverageGenerator } from "../../../src/metric/application/MetricsAverageGenerator";
import { IntervalUnitEnum } from "../../../src/metric/domain/value-objects/IntervalUnit";
import { MetricRepositoryMock } from "../mocks/ArticleRepositoryMock";
import { MetricMother } from "./MetricMother";
import { MetricNameMother } from "./MetricNameMother";

const metricRepositoryMock = new MetricRepositoryMock()
const metricsAverageGenerator = new MetricsAverageGenerator(metricRepositoryMock)


describe('Get metrics Averages', () => {
  it('should return the correct average for one metric', async () => {
    const mockedName = MetricNameMother.random();
    const roundedDate = new Date('2023-09-05T13:00:18.000Z'); // TODO
    const stringRoundedDate = roundedDate.toISOString();
    const date1 = new Date(roundedDate.getTime() + 1);
    const date2 = new Date(roundedDate.getTime() + 2);
    const date3 = new Date(roundedDate.getTime() + 3);

    const mockedArticle1 = MetricMother.randomValues(date1, mockedName);
    const mockedArticle2 = MetricMother.randomValues(date2, mockedName);
    const mockedArticle3 = MetricMother.randomValues(date3, mockedName);

    metricRepositoryMock.returnOnSearch([mockedArticle1, mockedArticle2, mockedArticle3])

    const received = await metricsAverageGenerator.run("mockedArticle.id.value")

    // metricRepositoryMock.assertSearch(mockedArticle.id)

    const average = (mockedArticle1.value.value + mockedArticle2.value.value + mockedArticle3.value.value) / 3;
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(1)
    expect(received.timeValues[0]).toEqual(stringRoundedDate)
    expect(received.metricValues[0].name).toEqual(mockedName.value)
    expect(received.metricValues[0].values[0]).toEqual(average)

  })
})
