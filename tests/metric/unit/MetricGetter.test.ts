import { MetricsAverageGenerator } from "../../../src/metric/application/MetricsAverageGenerator";
import { DateMother } from "../../shared/data-generator/DateMother";
import { MetricRepositoryMock } from "../mocks/ArticleRepositoryMock";
import { MetricMother } from "./MetricMother";

const metricRepositoryMock = new MetricRepositoryMock()
const metricsAverageGenerator = new MetricsAverageGenerator(metricRepositoryMock)


describe('Get metrics Averages', () => {
  it('Should create a Blog Post successfully', async () => {
    const date1 = DateMother.past();
    const date2 = new Date(date1.getTime() + 1);

    const mockedArticle1 = MetricMother.fixedDate(date1);
    const mockedArticle2 = MetricMother.fixedDate(date2);

    metricRepositoryMock.returnOnSearch([mockedArticle1, mockedArticle2])

    const received = await metricsAverageGenerator.run("mockedArticle.id.value")

    // metricRepositoryMock.assertSearch(mockedArticle.id)

    const average = (mockedArticle1.value.value + mockedArticle2.value.value) / 2;
    expect(received.metricValues[0].values[0]).toEqual(average)

  })
})
