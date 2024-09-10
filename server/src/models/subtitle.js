class Subtitle {
  constructor(filename, filler, episode, season, showName, language, releaseGroup) {
    this.filename = filename;
    this.filler = filler;
    this.episode = episode;
    this.season = season;
    this.showName = showName;
    this.language = language;
    this.releaseGroup = releaseGroup;
    this.dialogCount = 0;
  }

  incrementDialogCount() {
    this.dialogCount++;
  }

  decrementDialogCount() {
    if (this.dialogCount > 0) {
      this.dialogCount--;
    }
  }
}

module.exports = Subtitle;