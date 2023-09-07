import { MetricName, MetricNameEnum } from "../../../src/metric/domain/value-objects/MetricName";

export class MetricNameMother {
  static random(): MetricName {
    const values = Object.values(MetricNameEnum);
    const randomIndex = Math.floor(Math.random() * values.length);

    return new MetricName(values[randomIndex]);
  }

  static differentFrom(name: MetricName): MetricName {

    let newName = this.random();

    while (newName.toString() === name.toString()) {
      newName = this.random();
    }

    return newName;
  }
}
