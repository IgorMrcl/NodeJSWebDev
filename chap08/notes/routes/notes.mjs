// const util = require('util');
import { default as express } from "express";
import { NotesStore as notes } from '../models/notes-store.mjs';
import { ensureAuthenticated, twitterLogin } from './users.mjs'; 
export const router = express.Router();


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
    res.render("noteview", {
      twitterLogin: twitterLogin,
      title: note ? note.title : "",
      notekey: req.query.key,
      user: req.user ? req.user : undefined, 
      note: note,
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
      title: note ? `Delete ${note.title}`  : "",
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
