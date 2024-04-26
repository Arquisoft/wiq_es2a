const request = require('supertest');
let app;

beforeAll(async () => {
  app = require('./question-service');
});

afterAll(async () => {
  app.close();
});

describe('GET /questions', () => {
  it('should respond with a question, one correct answer and three incorrect answers', async () => {
    const response = await request(app)
      .post('/questions')
      .expect(200);

    expect(response.body).toHaveProperty('pregunta');
    expect(response.body).toHaveProperty('correcta');
    expect(response.body).toHaveProperty('incorrectas');
    expect(response.body.incorrectas).toHaveLength(3);
  });

});