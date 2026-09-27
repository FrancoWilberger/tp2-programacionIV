import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    // Configuración inicial de la base de datos en memoria para cada test
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('debe devolver una lista vacía si no hay notas creadas', () => {
    // Act (Actuar)
    const notes = service.listNotes();
    
    // Assert (Afirmar)
    expect(notes).toEqual([]);
    expect(notes).toHaveLength(0);
  });

  it('debe devolver todas las notas creadas', () => {
    // Arrange (Preparar)
    service.createNote({ title: 'Nota 1', content: 'Contenido 1' });
    service.createNote({ title: 'Nota 2', content: 'Contenido 2' });
    
    // Act (Actuar)
    const notes = service.listNotes();
    
    // Assert (Afirmar)
    expect(notes).toHaveLength(2);
    expect(notes[0].title).toBe('Nota 1');
    expect(notes[1].title).toBe('Nota 2');
  });
});