// const util = require('util');
import { default as express } from "express";
import { NotesStore as notes } from '../models/notes-store.mjs';
import { ensureAuthenticated, twitterLogin } from './users.mjs';
import { emitNoteTitles } from './index.mjs';
import { io } from '../app.mjs';
import { default as DBG } from "debug";
import {
  postMessage, destroyMessage, recentMessages,
  emitter as msgEvents
} from '../models/messages-sequelize.mjs';

const debug = DBG('notes:debug:home');
const error = DBG('notes:debug:error-home');


export const router = express.Router();

export function init() {
  io.of('/notes').on('connect', socket => {
    let notekey = socket.handshake.query.key;
    if (notekey) {
      socket.join(notekey);

      socket.on('create-message', async (newmsg, fn) => {
        try {
          await postMessage(
            newmsg.from, newmsg.namespace, newmsg.room,
            newmsg.message);
          fn('ok');
        } catch (err) {
          error(`FAIL to create message ${err.stack}`);
        }
      });

      socket.on('delete-message', async (data) => {
        try {
          await destroyMessage(data.id);
        } catch (err) {
          error(`FAIL to delete message ${err.stack}`);
        }
      });
    }
  });

  notes.on('noteupdated', note => {    
    const toemit = {
      key: note.key, title: note.title, body: note.body
    };
    io.of('/notes').to(note.key).emit('noteupdated', toemit);
    emitNoteTitles();
  });

  notes.on('notedestroyed', key => {
    io.of('/notes').to(key).emit('notedestroyed', key);
    emitNoteTitles();
  });

  msgEvents.on('newmessage', newmsg => {
    io.of(newmsg.namespace).to(newmsg.room).emit('newmessage', newmsg);
  });
  msgEvents.on('destroymessage', data => {
    io.of(data.namespace).to(data.room).emit('destroymessage', data);
  });
}

// Add Note.
router.get("/add", ensureAuthenticated, (req, res, next) => {
  res.render("noteedit", {
    twitterLogin: twitterLogin,
    title: "Add a Note",
    docreate: true,
    notekey: "",
    user: req.user,
    note: undefined,
  });
});

// Save Note (update)
router.post("/save", ensureAuthenticated, async (req, res, next) => {
  try {
    let note;
    if (req.body.docreate === "create") {
      note = await notes.create(
        req.body.notekey,
        req.body.title,
        req.body.body
      );
    } else {
      note = await notes.update(
        req.body.notekey,
        req.body.title,
        req.body.body
      );
    }
    //res.redirect('/notes/view?key='+ req.body.notekey);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// Read Note (read)
router.get("/view", async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    const messages = await recentMessages('/notes', req.query.key);
    res.render("noteview", {
      twitterLogin: twitterLogin,
      title: note ? note.title : "",
      notekey: req.query.key,
      user: req.user ? req.user : undefined,
      note: note,
      messages : messages
    });
  } catch (err) {
    next(err);
  }
});

// Delete note (destroy)
router.get("/destroy", ensureAuthenticated, async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    res.render("notedestroy", {
      twitterLogin: twitterLogin,
      title: note ? `Delete ${note.title}` : "",
      notekey: req.query.key,
      user: req.user ? req.user : undefined,
      note: note,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/destroy/confirm", ensureAuthenticated, async (req, res, next) => {
  try {
    await notes.destroy(req.body.notekey);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// Edit note (update)
router.get("/edit", ensureAuthenticated, async (req, res, next) => {
  try {
    const note = await notes.read(req.query.key);
    note.docreate = false;
    res.render("noteedit", {
      twitterLogin: twitterLogin,
      title: note ? note.title : "",
      notekey: req.query.key,
      user: req.user,
      note: note,
      docreate: false,
    });
  } catch (err) {
    next(err);
  }
});
