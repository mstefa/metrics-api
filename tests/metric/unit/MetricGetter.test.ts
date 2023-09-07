import { MetricsAverageGenerator } from "../../../src/metric/application/MetricsAverageGenerator";
import { intervalUnitEnum } from "../../../src/metric/domain/value-objects/intervalUnit";
import { MetricRepositoryMock } from "../mocks/ArticleRepositoryMock";
import { MetricMother } from "./MetricMother";
import { MetricNameMother } from "./MetricNameMother";

const metricRepositoryMock = new MetricRepositoryMock()
const metricsAverageGenerator = new MetricsAverageGenerator(metricRepositoryMock)


describe('Get metrics Averages', () => {
  it('should return the correct average for one metric in a second when there are data in the DB', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = intervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:01.000Z';
    const date1 = new Date(from);
    const date2 = new Date(date1.getTime() + 2);
    const date3 = new Date(date1.getTime() + 3);

    const mockedArticle1 = MetricMother.randomValues(date1, name);
    const mockedArticle2 = MetricMother.randomValues(date2, name);
    const mockedArticle3 = MetricMother.randomValues(date3, name);

    metricRepositoryMock.returnOnSearch([mockedArticle1, mockedArticle2, mockedArticle3])

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    const average = (mockedArticle1.value.value + mockedArticle2.value.value + mockedArticle3.value.value) / 3;
    expect(received.intervalUnit).toEqual(intervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(1)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(average)

  })

  it('should return the correct average for one metric in a second when there are data in the DB, and cero when the metric does not exist', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = intervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:02.000Z';
    const date1 = new Date(from);
    const date2 = new Date(date1.getTime() + 2);
    const date3 = new Date(date1.getTime() + 3);

    const mockedArticle1 = MetricMother.randomValues(date1, name);
    const mockedArticle2 = MetricMother.randomValues(date2, name);
    const mockedArticle3 = MetricMother.randomValues(date3, name);

    metricRepositoryMock.returnOnSearch([mockedArticle1, mockedArticle2, mockedArticle3])

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    const average = (mockedArticle1.value.value + mockedArticle2.value.value + mockedArticle3.value.value) / 3;
    expect(received.intervalUnit).toEqual(intervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(2)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(average)

  })

  it('should return the correct average for two different metric in a second when there are data in the DB', async () => {
    // Arrange
    const name1 = MetricNameMother.random();
    const name2 = MetricNameMother.differentFrom(name1);
    const intervalUnit = intervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:01.000Z';
    const date1 = new Date(from);
    const date2 = new Date(date1.getTime() + 2);
    const date3 = new Date(date1.getTime() + 3);

    const mockedArticle11 = MetricMother.randomValues(date1, name1);
    const mockedArticle21 = MetricMother.randomValues(date2, name1);
    const mockedArticle31 = MetricMother.randomValues(date3, name1);
    const mockedArticle12 = MetricMother.randomValues(date1, name2);
    const mockedArticle22 = MetricMother.randomValues(date2, name2);
    const mockedArticle32 = MetricMother.randomValues(date3, name2);

    metricRepositoryMock.returnOnSearch([mockedArticle11, mockedArticle21, mockedArticle31, mockedArticle12, mockedArticle22, mockedArticle32])

    // Act
    const received = await metricsAverageGenerator.run({ names: [name1.value], from, to, intervalUnit })

    // Assert
    const average1 = (mockedArticle11.value.value + mockedArticle21.value.value + mockedArticle31.value.value) / 3;
    const average2 = (mockedArticle11.value.value + mockedArticle21.value.value + mockedArticle31.value.value) / 3;
    expect(received.intervalUnit).toEqual(intervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(1)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues.length).toEqual(2)
    expect(received.metricValues[0].name).toEqual(name1.value)
    expect(received.metricValues[0].name).toEqual(name2.value)
    expect(received.metricValues[0].values[0]).toEqual(average1)
    expect(received.metricValues[0].values[0]).toEqual(average2)

  })
})
