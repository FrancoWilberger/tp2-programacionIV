import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../app';


describe('Rutas de Notas - GET /notes/:id (Ejercicio 3)', () => {
  let app: any;

  beforeEach(() => {
    // Levantamos la app con una base de datos limpia en memoria para cada test
    app = makeApp(':memory:');
  });

  it('debe devolver status 200 y la nota si el ID existe', async () => {
    // Arrange: Creamos una nota primero usando un POST
    const resPost = await request(app)
      .post('/notes')
      .send({ title: 'Nota HTTP', content: 'Probando GET' });
    
    const noteId = resPost.body.id;

    // Act: Buscamos esa nota generada haciendo un GET
    const resGet = await request(app).get(`/notes/${noteId}`);

    // Assert
    expect(resGet.status).toBe(200);
    expect(resGet.body.title).toBe('Nota HTTP');
  });

  it('debe devolver status 404 si el ID no existe', async () => {
    // Act: Intentamos buscar una nota con un ID altísimo
    const resGet = await request(app).get('/notes/9999');

    // Assert
    expect(resGet.status).toBe(404);
  });
});