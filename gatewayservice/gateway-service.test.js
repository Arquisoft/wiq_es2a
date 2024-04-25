const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

afterAll(async () => {
    app.close();
  });

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    } else if (url.endsWith('/addRecord')) {
      return Promise.resolve({ data: { recordId: 'mockedRecordId' } });
    } else if (url.endsWith('/getRecords')) {
      return Promise.resolve({ 
        data: [{ user_id: "user",
        correctQuestions: 10,
        totalQuestions: 20,
        totalTime: 200 } ]});
    } else if (url.endsWith('/questions')) {
      return Promise.resolve({ data: {
        pregunta: "¿Cuál es la capital de España?",
        correcta: "España",
        incorrectas: ["Londres", "París", "Berlín"]
      } });
    }
  });
  axios.get.mockImplementation((url, data) => {
    if (url.endsWith('/getAllUsers')) {
      return Promise.resolve({ data: 
        [{ username: "user",
        createdAt: "2022-01-01T00:00:00Z"
        } ,
        { username: "user2",
        createdAt: "2022-02-01T00:00:00Z"
        }] });
    }
  });
  
  // Test /health endpoint
  it('should forward health request', async () => {
    const response = await request(app)
    .get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /addRecord endpoint
  it('should forward add record request to record service', async () => {
    const response = await request(app)
      .post('/addRecord')
      .send({ user_id: "user",
        correctQuestions: 10,
        totalQuestions: 20,
        totalTime: 200 });

    expect(response.statusCode).toBe(200);
    expect(response.body.recordId).toBe('mockedRecordId');
  });

  // Test /getRecords endpoint
  it('should forward get records request to record service', async () => {
    const response = await request(app)
      .post('/getRecords')
      .send({ username: "user" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ user_id: "user",
    correctQuestions: 10,
    totalQuestions: 20,
    totalTime: 200 } ]);
  });

  // Test /questions endpoint
  it('should forward get questions request to questions service', async () => {
    const response = await request(app)
      .post('/questions');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      pregunta: "¿Cuál es la capital de España?",
      correcta: "España",
      incorrectas: ["Londres", "París", "Berlín"]
    });
  });

  // Test /getAllUsers endpoint
  it('should forward get all users request to users service', async () => {
    const response = await request(app)
      .get('/getAllUsers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ username: "user", createdAt: "2022-01-01T00:00:00Z"} ,
    { username: "user2", createdAt: "2022-02-01T00:00:00Z"}]);
  });

});