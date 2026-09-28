import { test, expect } from '@playwright/test';
import { resetAndSeed } from './helpers';

test.describe('Notes API - E2E', () => {
  test('happy path: crear, consultar, modificar y eliminar una nota', async ({ request, baseURL }) => {
    await resetAndSeed(baseURL!);

    const createResponse = await request.post('/notes', {
      data: {
        title: 'Nota E2E',
        content: 'Contenido de prueba E2E',
        pinned: false
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdNote = await createResponse.json();

    expect(createdNote.title).toBe('Nota E2E');
    expect(createdNote.content).toBe('Contenido de prueba E2E');

    const getResponse = await request.get(`/notes/${createdNote.id}`);

    expect(getResponse.status()).toBe(200);

    const note = await getResponse.json();

    expect(note.id).toBe(createdNote.id);

    const updateResponse = await request.patch(`/notes/${createdNote.id}`, {
      data: {
        title: 'Nota E2E modificada'
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedNote = await updateResponse.json();

    expect(updatedNote.title).toBe('Nota E2E modificada');
    expect(updatedNote.content).toBe('Contenido de prueba E2E');

    const deleteResponse = await request.delete(`/notes/${createdNote.id}`);

    expect(deleteResponse.status()).toBe(204);

    const getDeletedResponse = await request.get(`/notes/${createdNote.id}`);

    expect(getDeletedResponse.status()).toBe(404);
  });

  test('error: crear una nota con datos inválidos', async ({ request, baseURL }) => {
    await resetAndSeed(baseURL!);

    const response = await request.post('/notes', {
      data: {
        title: '',
        content: 'Contenido inválido'
      }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toBe('ValidationError');
  });
});