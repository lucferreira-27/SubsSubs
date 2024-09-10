const { ObjectId } = require('mongodb');

class Subtitle {
  constructor(filename, filler, episode, dialogs = []) {
    this.filename = filename;
    this.filler = filler;
    this.episode = episode;
    this.dialogs = dialogs;
  }
}

class Dialog {
  constructor(subtitleId, text, startTime, endTime, name = "") {
    this.subtitleId = new ObjectId(subtitleId);
    this.text = text;
    this.startTime = startTime;
    this.endTime = endTime;
    this.name = name;
  }
}

module.exports = { Subtitle, Dialog };