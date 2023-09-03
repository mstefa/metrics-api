import { ArticleGetter } from "../../../src/article/application/ArticleGetter";
import { MetricRepositoryMock } from "../mocks/ArticleRepositoryMock";
import { ArticleMother } from "./ArticleMother";

const articleRepositoryMock = new MetricRepositoryMock()
const articleGetter = new ArticleGetter(articleRepositoryMock)


describe('Create a Blog Post', () => {
  it('Should create a Blog Post successfully', async () => {

    const mokedArticle = ArticleMother.random();
    articleRepositoryMock.returnOnSearch(mokedArticle)

    const received = await articleGetter.run(mokedArticle.id.value)

    articleRepositoryMock.assertSearch(mokedArticle.id)
    expect(received).toEqual(mokedArticle.toPrimitives())

  })
})
