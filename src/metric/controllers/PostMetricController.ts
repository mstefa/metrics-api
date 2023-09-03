import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { MetricCreator } from '../application/MetricCreator';
import { Metric } from '../domain/Metric';
import { Controller } from './Controller';

type MetricRequest = Request & {
  body: Metric;
};

export class MetricController extends Controller {
  private metricCreator: MetricCreator;

  constructor(metricCreator: MetricCreator) {
    super();
    this.metricCreator = metricCreator;
  }

  async run(req: MetricRequest, res: Response) {
    const { timestamp, name, value } = req.body;

    try {
      await this.metricCreator.run({ timestamp, name, value });
      res.status(httpStatus.OK).send();
    } catch (error) {
      this.errorHandling(error, res);
    }
  }
}
