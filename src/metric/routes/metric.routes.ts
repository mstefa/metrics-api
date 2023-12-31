import { Request, Response, Router } from 'express';
import { body, query } from 'express-validator';

import { DependencyContainer } from '../../MetricDependencyInjectionContainer';
import { IntervalUnitEnum } from '../domain/value-objects/IntervalUnit';
import { MetricNameEnum } from '../domain/value-objects/MetricName';
import { validateReqSchema } from '.';

export const register = (router: Router) => {

  const DIContainer = DependencyContainer.getInstance();

  const reqPostArticleSchema = [
    body('timestamp')
      .notEmpty()
      .isISO8601()
      .withMessage('Timestamp is required and must be in ISO 8601 format (e.g., "2023-09-03T15:45:23.211Z")'),
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('value')
      .notEmpty()
      .isNumeric()
      .withMessage('Value is required and must be a number'),
  ];

  const reqGetArticleSchema = [
    query('name')
      .isIn(Object.values(MetricNameEnum))
      .withMessage(`name should be one of ${Object.values(MetricNameEnum).join(', ')}`),
    query('from')
      .notEmpty()
      .isISO8601()
      .withMessage('from is required and param must be in ISO 8601 format (e.g., "2023-09-03T15:45:23.211Z")'),
    query('to')
      .notEmpty()
      .isISO8601()
      .withMessage('to is required and param must be in ISO 8601 format (e.g., "2023-09-03T15:45:23.211Z")'),
    query('intervalUnit')
      .notEmpty()
      .isIn(Object.values(IntervalUnitEnum))
      .withMessage(`intervalUnit is required and should be one of ${Object.values(IntervalUnitEnum).join(', ')}`),
  ];

  router.post('/metric', reqPostArticleSchema, validateReqSchema, (req: Request, res: Response) =>
    DIContainer.postMetricController.run(req, res)
  );

  router.get('/metrics', reqGetArticleSchema, validateReqSchema, (req: Request, res: Response) =>
    DIContainer.getMetricsController.run(req, res)
  );
};
