module.exports.Note = class Note {
  constructor(key, title, body) {
    this._key = key;
    this._title = title;
    this._body = body;
  }

  get key() {
    return this._key;
  }
  get title() {
    return this._title;
  }
  set title(newTitle) {
    this._title = newTitle;
  }
  get body() {
    return this._body;
  }
  set body(newBody) {
    this._body = newBody;
  }
};

class LoveNote extends this.Note {
  constructor(key, title, body, heart) {
    super(key, title, body);
    this._heart = heart;
  }

  get heart() {
    return this._heart;
  }
  set heart(newHeart) {
    this._heart = newHeart;
  }
}


// if (anotherNote instanceof Note) {
//     ... it's a Note, so act on it as a Note
// }