import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { NoteRepository } from '../../src/repositories/NoteRepository';
import { notify } from '../../src/services/notificationService';

// Mock del módulo de notificación usando Vitest
vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - Ejercicio 6: Notificación al fijar', () => {
  let noteService: NoteServiceImpl;
  let mockRepo: NoteRepository;

  beforeEach(() => {
    vi.clearAllMocks(); // Limpiamos el historial de llamadas del mock antes de cada test
    mockRepo = {
      create: vi.fn((data) => ({
        id: 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
      findAll: vi.fn(),
      findById: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      clear: vi.fn(), 
    };

    noteService = new NoteServiceImpl(mockRepo);
  });

  it('debe llamar a notify() cuando la nota se crea con pinned: true', () => {
    const newNoteData = {
      title: 'Nota importante',
      content: 'Contenido fijado',
      pinned: true,
    };

    const createdNote = noteService.createNote(newNoteData);

    // Verificamos que notify se haya llamado exactamente 1 vez y con la nota creada
    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(createdNote);
  });

  it('NO debe llamar a notify() cuando pinned es false o undefined', () => {
    const newNoteData = {
      title: 'Nota común',
      content: 'Contenido sin fijar',
      pinned: false,
    };

    noteService.createNote(newNoteData);

    expect(notify).not.toHaveBeenCalled();
  });
});