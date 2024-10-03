const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI.replace('<db_password>', process.env.MONGODB_PASSWORD);
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const AnimeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  slug: { type: String, unique: true },
  episodeCount: { type: Number, min: 0 },
  images: Object,
  seasons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Season' }],
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }]
});

const SeasonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  seasonNumber: { type: Number, required: true, min: 1 },
  numberOfEpisodes: { type: Number, required: true, min: 0 },
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
});

const SubtitleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  episodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
  episodeTitle: String,
  language: { type: String, required: true },
  seasonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
  dialogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dialog' }]
});

const EpisodeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug_title: { type: String, required: true },
  description: { type: String },
  images: Object,
  anime: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
  season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
  episodeNumber: { type: Number, required: true, min: 1 },
});

const DialogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subtitleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtitle', required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  text: { type: String, required: true }
});

// Indexes
AnimeSchema.index({ slug: 1 });
SeasonSchema.index({ animeId: 1, seasonNumber: 1 });
EpisodeSchema.index({ anime: 1, season: 1, episodeNumber: 1 });
SubtitleSchema.index({ episodeId: 1, language: 1 }, { unique: true });
DialogSchema.index({ text: 'text' });

// Pre-save hooks
AnimeSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

EpisodeSchema.pre('save', function(next) {
  if (!this.slug_title) {
    this.slug_title = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

const Anime = mongoose.model('Anime', AnimeSchema);
const Season = mongoose.model('Season', SeasonSchema);
const Subtitle = mongoose.model('Subtitle', SubtitleSchema);
const Dialog = mongoose.model('Dialog', DialogSchema);
const Episode = mongoose.model('Episode', EpisodeSchema);

module.exports = {
  connectToDatabase,
  Anime,
  Season,
  Subtitle,
  Dialog,
  Episode
};