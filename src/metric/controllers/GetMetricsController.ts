import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Logger } from '../../shared/infrastructure/logger/Logger';
import { MetricsAverageGenerator } from '../application/MetricsAverageGenerator';
import { Controller } from './Controller';


export class GetMetricsController extends Controller {
  private metricGetter: MetricsAverageGenerator
  constructor(articleGetter: MetricsAverageGenerator) {
    super();
    this.metricGetter = articleGetter;
  }

  async run(req: Request, res: Response) {
    const id = req.params.id;
    Logger.info(`request received in ${req.path}`);
    try {
      const article = await this.metricGetter.run(id);
      res.status(httpStatus.OK).json(article);
    } catch (error) {
      this.errorHandling(error, res);
    }
  }
}

