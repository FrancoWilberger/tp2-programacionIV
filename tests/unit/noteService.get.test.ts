import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - getNote (Ejercicio 3)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('debe devolver la nota correcta si el ID existe', () => {
    // Arrange (Preparar)
    const nuevaNota = service.createNote({ title: 'Nota específica', content: 'Contenido a buscar' });
    
    // Act (Actuar)
    const notaEncontrada = service.getNote(nuevaNota.id!);
    
    // Assert (Afirmar)
    expect(notaEncontrada).toBeDefined();
    expect(notaEncontrada?.title).toBe('Nota específica');
  });

  it('debe devolver undefined si se busca un ID que no existe', () => {
    // Act (Actuar)
    const notaInexistente = service.getNote(999);
    
    // Assert (Afirmar)
    expect(notaInexistente).toBeUndefined();
  });
});