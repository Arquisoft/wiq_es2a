const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const User = require('./auth-model');

let mongoServer;
let app;

//test user
const user = {
  username: 'testuser',
  password: 'testpassword',
};

async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./auth-service'); 
  //Load database with initial conditions
  await addUser(user);
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  it('Should perform a login operation /login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should return 400 if username is empty or blank', async () => {
    const userError1 = {
        username: ' ',
        password: 'testpassword',
    };

    const response = await request(app).post('/login').send(userError1);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'El nombre de usuario no puede estar vacío');
  });

  it('should return 400 if password is empty or blank', async () => {
    const userError2 = {
        username: 'testusername',
        password: ' ',
    };

    const response = await request(app).post('/login').send(userError2);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'La contraseña no puede estar vacía');
  });

  it('should return 401 if username or password is incorrect', async () => {
    const userError3 = {
        username: 'wrongusername',
        password: 'wrongpassword',
      
    };

    const response = await request(app).post('/login').send(userError3);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Credenciales inválidas');
  });

  it('should return 500 if there is a server error', async () => {
    const userError4 = {
      username: 'wrongFormat',
    };

    const response = await request(app).post('/login').send(userError4);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});
