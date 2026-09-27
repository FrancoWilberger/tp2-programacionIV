import { describe, it, expect, beforeEach } from "vitest";
import { NoteServiceImpl } from "../../src/services/NoteService";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository";
import { createDb } from "../../src/db/connection";

describe("NoteService - updateNote", () => {
  let noteService: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(":memory:");
    const repo = new SqliteNoteRepository(db);
    noteService = new NoteServiceImpl(repo);
  });

  it("debe actualizar parcialmente una nota existente", () => {
    const created = noteService.createNote({
      title: "Nota original",
      content: "Contenido original",
    });

    const updated = noteService.updateNote(created.id, {
      title: "Título modificado",
    });

    expect(updated).toBeDefined();
    expect(updated?.title).toBe("Título modificado");
    expect(updated?.content).toBe("Contenido original");
    expect(updated?.updatedAt).not.toBe(created.createdAt);
  });

  it("debe retornar undefined si intenta actualizar una nota que no existe", () => {
    const result = noteService.updateNote(9999, { title: "No existe" });
    expect(result).toBeUndefined();
  });
});