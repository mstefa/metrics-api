import { faker } from '@faker-js/faker';

export class NumberMother {
  static random(): number {
    return faker.number.float();
  }
}
