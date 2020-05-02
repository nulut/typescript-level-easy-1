import { app } from '../src/app';
import supertest from 'supertest';
import 'reflect-metadata';

const agent = supertest(app);

describe('test start', () => {
  test('test', async () => {
    const response = await agent.get('/hello');
    expect(response.status).toBe(404);
  });
});
