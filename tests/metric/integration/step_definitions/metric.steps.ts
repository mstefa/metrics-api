import { AfterAll, BeforeAll, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert'
import { MongoClient } from 'mongodb';
import supertest from 'supertest';

import { MetricCriteria } from '../../../../src/metric/domain/MetricCriteria';
import { MetricName } from '../../../../src/metric/domain/value-objects/MetricName';
import { MongoMetricRepository } from '../../../../src/metric/infrastructure/MongoMetricRepository';
import Server from '../../../../src/server';
import { config } from '../../../../src/shared/config/appConfig';
import { Timestamp } from '../../../../src/shared/domain/value-objects/Timestampt';
import { MongoClientFactory } from '../../../../src/shared/infrastructure/mongo/MongoClientFactory';
import { seedDB } from './steps-utilities';

let application: Server;
let _request: supertest.Test;
let _response: supertest.Response;
let _metricRepository: MongoMetricRepository;
let _mongoClient: Promise<MongoClient>;


When('I send a GET request to {string}', (route: string) => {
  _request = supertest(application.getHTTPServer()).get(route)
});

When('I send a POST request to {string} with body:', (route: string, bodyData: string) => {
  const body = JSON.parse(bodyData)
  _request = supertest(application.getHTTPServer())
    .post(route)
    .set('Content-Type', 'application/json')
    .send(body);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the body should have a message {string}', (message: string) => {
  assert.deepStrictEqual(_response.body, { message });
});

Then('the response should have a payload:', (payload: string) => {
  const expected = JSON.parse(payload)
  assert.deepStrictEqual(_response.body, expected);
});

Then('the Metric should be save in the db:', async (payload: string) => {
  const expectedMetric = JSON.parse(payload)
  const name = new MetricName(expectedMetric.name);
  const from = new Timestamp(expectedMetric.timestamp);
  const to = new Timestamp(expectedMetric.timestamp);

  const criteria = new MetricCriteria([name], from, to)
  const metricOnDb = await _metricRepository.search(criteria)

  assert.deepStrictEqual(1, metricOnDb.length)
});

Then('the response has as unit {string}, with {int} values starting from {string} and {int} sets of values', (unit: string, numberOfValues: number, fromDate: string, numberOfSet: number) => {
  assert.deepStrictEqual(_response.body.intervalUnit, unit)
  assert.deepStrictEqual(_response.body.timeValues.length, numberOfValues)
  assert.deepStrictEqual(_response.body.metricValues.length, numberOfSet)
  assert.deepStrictEqual(_response.body.timeValues[0], fromDate)
});

BeforeAll(async () => {
  application = new Server(4000);
  await application.start();
  const url = `${config.db.host}/${config.app.env}`;
  _mongoClient = MongoClientFactory.createClient({ url });
  _metricRepository = new MongoMetricRepository(_mongoClient);
  await seedDB(_metricRepository)

});

AfterAll(async () => {
  const client = await _mongoClient
  const collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray();
  const collectionsNames = collections.map(collection => collection.name);
  for (const collectionName of collectionsNames) {
    // eslint-disable-next-line no-await-in-loop
    await client.db().collection(collectionName).deleteMany({});
  }

  await client.close(true)
  await application.stop();

});


