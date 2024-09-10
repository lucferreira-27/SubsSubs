const { ObjectId } = require('mongodb');

class Dialog {
  constructor(subtitleId, text, startTime, endTime, name = "") {
    this.subtitleId = typeof subtitleId === 'string' ? new ObjectId(subtitleId) : ObjectId.createFromTime(subtitleId);
    this.text = text;
    this.startTime = startTime;
    this.endTime = endTime;
    this.name = name;
  }
}

module.exports = Dialog;