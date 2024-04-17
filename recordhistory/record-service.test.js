const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Record = require('./record-model');

let mongoServer;
let app;

//Record de prueba
const newRecord = {
    user_id: 'testuser',
    correctQuestions: 8,
    totalQuestions: 10,
    totalTime: 120,
  };

// Meter varios records en la base de datos
const records = [
    {
      user_id: 'testuser',
      correctQuestions: 8,
      totalQuestions: 10,
      totalTime: 120,
    },
    {
      user_id: 'testuser',
      correctQuestions: 6,
      totalQuestions: 12,
      totalTime: 90,
    },
  ];

//Iniciar la conexión con la base de datos
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGODB_URI = mongoUri;
    app = require('./record-service'); 
  });

//Cerrar la conexión con la base de datos
afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

//Borrar todos los records antes de cada test
beforeEach(async () => {
    await Record.deleteMany();
  });

describe('Record Service', () => {
  it('Should add a new record to an user using POST /addRecord', async () => {
    const response = await request(app).post('/addRecord').send(newRecord);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user_id', 'testuser');
  });

  it('Should get all the records of an user using POST /getRecords', async () => {
    await Record.insertMany(records);
    const response = await request(app).post('/getRecords').send({ username: 'testuser' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    //Compruebo que los dos records pertenecen al mismo usuario
    expect(response.body[0]).toHaveProperty('user_id', 'testuser');
    expect(response.body[1]).toHaveProperty('user_id', 'testuser');
    
    //Compruebo que los records tienen el número de preguntas correctas correcto
    expect(response.body[0]).toHaveProperty('correctQuestions', 8);
    expect(response.body[1]).toHaveProperty('correctQuestions', 6);

    //Compruebo que los records tienen el número total de preguntas correcto
    expect(response.body[0]).toHaveProperty('totalQuestions', 10);
    expect(response.body[1]).toHaveProperty('totalQuestions', 12);

    //Compruebo que los records tienen el número total de preguntas correcto
    expect(response.body[0]).toHaveProperty('totalTime', 120);
    expect(response.body[1]).toHaveProperty('totalTime', 90);
  });
});