import { default as DBG } from 'debug';
const debug = DBG('notes:notes-store');
//const error = DBG('notes:error-store');

var _NotesStore;

export async function useModel(model) {
    try {
        let NotesStoreModule = await import(`./notes-${model}.mjs`);
        let NotesStoreClass = NotesStoreModule.default;
        _NotesStore = new NotesStoreClass();
        debug(`Conectado no store ${model}`)
        return _NotesStore;
    } catch (err) {
        throw new Error(`No recognized NotesStore in ${model} because
          ${err}`);
    }
}

export { _NotesStore as NotesStore };