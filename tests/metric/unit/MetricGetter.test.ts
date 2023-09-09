import { MetricsAverageGenerator } from "../../../src/metric/application/MetricsAverageGenerator";
import { IntervalUnitEnum } from "../../../src/metric/domain/value-objects/IntervalUnit";
import { MetricRepositoryMock } from "../mocks/ArticleRepositoryMock";
import { MetricMother } from "./MetricMother";
import { MetricNameMother } from "./MetricNameMother";

const metricRepositoryMock = new MetricRepositoryMock()
const metricsAverageGenerator = new MetricsAverageGenerator(metricRepositoryMock)


describe('Get metrics Averages', () => {

  it('should return the correct average for one metric in a second when there are data in the DB', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = IntervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:01.000Z';
    const { mockedMetrics, average } = MetricMother.generateFakedMetricsGivenTimeAndName(new Date(from), new Date(to), name)

    metricRepositoryMock.returnOnSearch(mockedMetrics)

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(1)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(average)

  })

  it('should return the correct average for one metric two seconds when there are data in the DB', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = IntervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:02.000Z';
    const mocked1 = MetricMother.generateFakedMetricsGivenTimeAndName(new Date(from), new Date('2023-09-05T13:00:01.000Z'), name);
    const mocked2 = MetricMother.generateFakedMetricsGivenTimeAndName(new Date('2023-09-05T13:00:01.000Z'), new Date(to), name)

    metricRepositoryMock.returnOnSearch([...mocked1.mockedMetrics, ...mocked2.mockedMetrics])

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(2)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.timeValues[1]).toEqual('2023-09-05T13:00:01.000Z')
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(mocked1.average)
    expect(received.metricValues[0].values[1]).toEqual(mocked2.average)

  })

  it('should return cero when the metric does not exist', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = IntervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:02.000Z';

    metricRepositoryMock.returnOnSearch([])

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(2)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(0)

  })

  it('should return the correct average for one metric in a second when there are data in the DB, and cero when the metric does not exist', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = IntervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:02.000Z';
    const { mockedMetrics, average } = MetricMother.generateFakedMetricsGivenTimeAndName(new Date(from), new Date('2023-09-05T13:00:01.000Z'), name)

    metricRepositoryMock.returnOnSearch(mockedMetrics)

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(2)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(average)

  })

  it('should return the correct average for two different metric in a second when there are data in the DB', async () => {
    // Arrange
    const name1 = MetricNameMother.random();
    const name2 = MetricNameMother.differentFrom(name1);
    const intervalUnit = IntervalUnitEnum.SECOND.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:00:01.000Z';
    const mocked1 = MetricMother.generateFakedMetricsGivenTimeAndName(new Date(from), new Date(to), name1);
    const mocked2 = MetricMother.generateFakedMetricsGivenTimeAndName(new Date(from), new Date(to), name2)

    metricRepositoryMock.returnOnSearch([...mocked1.mockedMetrics, ...mocked2.mockedMetrics])

    // Act
    const received = await metricsAverageGenerator.run({ names: [name1.value], from, to, intervalUnit })

    // Assert
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.SECOND)
    expect(received.timeValues.length).toEqual(1)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues.length).toEqual(2)
    expect(received.metricValues[0].name).toEqual(name1.value)
    expect(received.metricValues[1].name).toEqual(name2.value)
    expect(received.metricValues[0].values[0]).toEqual(mocked1.average)
    expect(received.metricValues[1].values[0]).toEqual(mocked2.average)

  })

  it('should return the correct average for one metric in a hour when there are data in the DB', async () => {
    // Arrange
    const name = MetricNameMother.random();
    const intervalUnit = IntervalUnitEnum.HOUR.toString();
    const from = '2023-09-05T13:00:00.000Z';
    const to = '2023-09-05T13:59:00.000Z';
    const { mockedMetrics, average } = MetricMother.generateFakedMetricsGivenTimeAndName(new Date(from), new Date(to), name)

    metricRepositoryMock.returnOnSearch(mockedMetrics)

    // Act
    const received = await metricsAverageGenerator.run({ names: [name.value], from, to, intervalUnit })

    // Assert
    expect(received.intervalUnit).toEqual(IntervalUnitEnum.HOUR)
    expect(received.timeValues.length).toEqual(1)
    expect(received.timeValues[0]).toEqual(from)
    expect(received.metricValues[0].name).toEqual(name.value)
    expect(received.metricValues[0].values[0]).toEqual(average)

  })
})
