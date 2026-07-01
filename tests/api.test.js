const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  describe('GET /', () => {
    test('should return welcome message with endpoints info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toEqual({
        message: 'API is running successfully'
      });
    });
  });

  describe('GET /healthcheck', () => {
    test('should return ok status', async () => {
      const response = await request(app)
        .get('/healthcheck')
        .expect(200);

      expect(response.body).toEqual({
        status: 'ok'
      });
    });
  });

  describe('GET /products/:id', () => {
    test('should return a product when id exists', async () => {
      const response = await request(app)
        .get('/products/1')
        .expect(200);

      expect(response.body).toEqual({
        id: 1,
        title: expect.any(String),
        price: expect.any(Number)
      });
    });

    test('should return 404 when product id does not exist', async () => {
      const response = await request(app)
        .get('/products/999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});