import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { MetricsAverageGenerator } from '../application/MetricsAverageGenerator';
import { Controller } from './Controller';

function toArrayOfString(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input;
  } if (typeof input === 'string') {
    return [input];
  }

  return [];
}

export class GetMetricsController extends Controller {
  private metricGetter: MetricsAverageGenerator
  constructor(articleGetter: MetricsAverageGenerator) {
    super();
    this.metricGetter = articleGetter;
  }

  async run(req: Request, res: Response) {
    const queryParamNames = req.query.name;
    const intervalUnit = req.query.intervalUnit as string;
    const from = req.query.from as string;
    const to = req.query.to as string;

    // Logger.info(`request received in ${req.path}`); TODO
    try {
      const names = toArrayOfString(queryParamNames);
      const article = await this.metricGetter.run({ names, from, to, intervalUnit });
      res.status(httpStatus.OK).json(article);
    } catch (error) {
      this.errorHandling(error, res);
    }
  }
}



