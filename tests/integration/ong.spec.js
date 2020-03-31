const request = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database/connection')

describe('Ong', () => {
  
  beforeEach(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it('should be able to create a new ONG.', async () => {
    
    const response = await request(app).post('/ongs').send({
      name: "Ong Teste",
      email: "teste@teste.co",
      whatsapp: "1155559999",
      city: "São Paulo",
      uf: "SP"
    });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    expect(response.status).toBe(200);

  });

  it('should fail on send invalid email.', async () => {
    
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Ong Teste",
        email: "teste@teste",
        whatsapp: "1155559999",
        city: "São Paulo",
        uf: "SP"
      });

    expect(response.status).toBe(400);

  });

});