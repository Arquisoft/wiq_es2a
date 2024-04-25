const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should return 400 if username is empty or blank', async () => {
    const userError1 = {
        username: ' ',
        password: 'testpassword',
    };

    const response = await request(app).post('/adduser').send(userError1);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'El nombre de usuario no puede estar vacío');
  });

  it('should return 400 if password is empty or blank', async () => {
    const userError2 = {
        username: 'testusername',
        password: ' ',
    };

    const response = await request(app).post('/adduser').send(userError2);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'La contraseña no puede estar vacía');
  });

  it('should return 400 if there is it misses information', async () => {
    const userError4 = {
      username: 'wrongFormat',
    };

    const response = await request(app).post('/adduser').send(userError4);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: password');
  });

  //For getting all users
  it('should GET all the users', async () => {
    const response = await request(app).get('/getAllUsers');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
