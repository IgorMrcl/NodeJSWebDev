import { Note, AbstractNotesStore } from "./Notes.mjs";
import { default as DBG } from 'debug';
const debug = DBG('notes:debug'); 

const notes = [];

export default class InMemoryNotesStore extends AbstractNotesStore {
  async close() {}

  async update(key, title, body) {
    notes[key] = new Note(key, title, body);
    debug(`Nota com a chave ${key} atualizada`);
    return notes[key];
  }

  async create(key, title, body) {
    notes[key] = new Note(key, title, body);
    debug(`Nota com a chave ${key} criada`)
    return notes[key];
  }

  async read(key) {
    if (notes[key]) return notes[key];
    else throw new Error(`Note ${key} does not exist`);
    debug(`Nota com a chave ${key} lida`)
  }

  async destroy(key) {
    if (notes[key]) {
      delete notes[key];
    } else throw new Error(`Note ${key} does not exist`);
    debug(`Nota com a chave ${key} destruida`)
  }

  async keylist() {
    return Object.keys(notes);
  }

  async count() {
    return notes.length;
  }
}
