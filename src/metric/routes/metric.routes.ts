import { Request, Response, Router } from 'express';
import { body, param } from 'express-validator';

import { MetricDependencyInjectionContainer } from '../../MetricDependencyInjectionContainer';
import { validateReqSchema } from '.';

export const register = (router: Router) => {

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

  const reqGetArticleSchema = [param('name').optional()];

  router.post('/metric', reqPostArticleSchema, validateReqSchema, (req: Request, res: Response) =>
    MetricDependencyInjectionContainer.postMetricController.run(req, res)
  );

  router.get('/metrics', reqGetArticleSchema, validateReqSchema, (req: Request, res: Response) =>
    MetricDependencyInjectionContainer.getMetricsController.run(req, res)
  );
};
