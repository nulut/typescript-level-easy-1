import supertest from 'supertest';
import { app } from '../../src/app';
import { PrismaClient } from '@prisma/client';

describe('test Todo', () => {
  const client = supertest(app);
  test('test index todos', async () => {
    const response = await client.get('/books');
    expect(response.status).toBe(200);
    const datas = response.body;
    expect(datas.length).toBe(9);
  });

  test('test create todos', async () => {
    const data = {
      title: 'What a good test code!',
      author: 'tester',
    };
    const response = await client.post('/books').send(data);
    expect(response.status).toBe(200);

    const actual = await new PrismaClient().book.findOne({
      where: { id: Number(response.body.id) },
    });
    expect(actual.title).toBe(data.title);
    expect(actual.author).toBe(data.author);
  });

  test('test remove todos', async () => {
    const bookId = 3;
    const response = await client.delete(`/books/${bookId}`);
    expect(response.status).toBe(500);
  });
});
