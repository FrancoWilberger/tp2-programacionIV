import { describe, it, expect, beforeEach } from "vitest";
import { NoteServiceImpl } from "../../src/services/NoteService";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository";
import { createDb } from "../../src/db/connection";

describe("NoteService - deleteNote", () => {
  let noteService: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(":memory:");
    const repo = new SqliteNoteRepository(db);
    noteService = new NoteServiceImpl(repo);
  });

  it("debe eliminar una nota existente y retornar true", () => {
    const created = noteService.createNote({
      title: "Nota a eliminar",
      content: "Contenido a eliminar",
    });

    const deleted = noteService.deleteNote(created.id);

    expect(deleted).toBe(true);
    expect(noteService.getNote(created.id)).toBeUndefined();
  });

  it("debe retornar false si intenta eliminar una nota que no existe", () => {
    const result = noteService.deleteNote(9999);
    expect(result).toBe(false);
  });
});