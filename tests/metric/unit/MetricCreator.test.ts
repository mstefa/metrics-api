import { MetricCreator } from '../../../src/metric/application/MetricCreator';
import { MetricRepositoryMock } from '../mocks/ArticleRepositoryMock';
import { MetricMother } from './ArticleMother';

let articleRepositoryMock: MetricRepositoryMock;
let metricCreator: MetricCreator;

beforeEach(() => {
  articleRepositoryMock = new MetricRepositoryMock()
  metricCreator = new MetricCreator(articleRepositoryMock)
});

describe('Create a new Metric insert', () => {
  it('Should create a Metric successfully', async () => {

    const metric = MetricMother.random();
    const metricRequest = metric.toPrimitives();
    await metricCreator.run(metricRequest)
    articleRepositoryMock.assertLastSavedMetricIs(metric);
  })

  // xit('Should throw an error if the Blog Post Date is not a past date', async () => {

  //   const article = ArticleMother.random();
  //   const articleRequest = article.toPrimitives();
  //   // force future date
  //   articleRequest.date = DateMother.future().toISOString();

  //   try {
  //     expect(await articleCreator.run(articleRequest)).toThrow()
  //   } catch (e) {
  //     const error = e as Error
  //     expect(error.message as string).toMatch("<ArticleDate> should be a past date");
  //   }
  // })

  // xit('Should throw an error if the Author email is not valid', async () => {

  //   const article = ArticleMother.random();
  //   const articleRequest = article.toPrimitives();
  //   // force invalid email
  //   articleRequest.authorEmail = WordMother.random();

  //   try {
  //     expect(await articleCreator.run(articleRequest)).toThrow()
  //   } catch (e) {
  //     const error = e as Error
  //     expect(error.message as string).toMatch(`<Email> does not allow the value <${articleRequest.authorEmail}>`);
  //   }
  // })

})


