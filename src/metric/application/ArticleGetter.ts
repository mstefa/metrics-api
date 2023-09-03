import { EntityNotFoundError } from "../../shared/domain/error/EntityNotFoundError";
import { MetricDto } from "../dtos/MetricDto";

export class ArticleGetter {
  // private repository: MetricRepository;

  constructor() {
    // constructor(repository: MetricRepository) {
    // this.repository = repository;
  }

  async run(id: string): Promise<MetricDto> {

    // const article = await this.repository.search(new Uuid(id))

    // if (article !== null) {
    //   return article.toPrimitives();
    // }

    throw new EntityNotFoundError(`Not implemented ID: ${id}`)
  }
}
