const express = require('express');
const { connectToDatabase } = require('./database');
const {
  createSubtitle,
  readSubtitles,
  updateSubtitle,
  deleteSubtitle,
  createDialog,
  readDialogs,
  updateDialog,
  deleteDialog,
  getSubtitleWithDialogs
} = require('./crud');
const { Subtitle, Dialog } = require('./models');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Subtitle routes
app.post('/subtitles', async (req, res) => {
  try {
    const subtitle = new Subtitle(req.body.filename, req.body.filler, req.body.episode);
    const result = await createSubtitle(subtitle);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/subtitles', async (req, res) => {
  try {
    const subtitles = await readSubtitles();
    res.json(subtitles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/subtitles/:id', async (req, res) => {
  try {
    const result = await updateSubtitle(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/subtitles/:id', async (req, res) => {
  try {
    const result = await deleteSubtitle(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dialog routes
app.post('/dialogs', async (req, res) => {
  try {
    const dialog = new Dialog(req.body.subtitleId, req.body.text, req.body.startTime, req.body.endTime, req.body.name);
    const result = await createDialog(dialog);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/dialogs', async (req, res) => {
  try {
    const dialogs = await readDialogs();
    res.json(dialogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/dialogs/:id', async (req, res) => {
  try {
    const result = await updateDialog(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/dialogs/:id', async (req, res) => {
  try {
    const result = await deleteDialog(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get subtitle with its dialogs
app.get('/subtitles/:id/with-dialogs', async (req, res) => {
  try {
    const result = await getSubtitleWithDialogs(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Subtitle not found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Existing examine-structure route
app.get('/examine-structure', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 10 documents if no limit is provided
    const documents = await readDocuments({}, limit);
    
    if (documents.length === 0) {
      return res.json({ message: "No documents found in the collection." });
    }

    const sampleDocument = documents[0];
    const structure = analyzeStructure(sampleDocument);

    res.json({
      totalDocuments: documents.length,
      sampleDocument: sampleDocument,
      structure: structure
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function analyzeStructure(obj, prefix = '') {
  let structure = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(structure, analyzeStructure(value, fullKey));
    } else {
      structure[fullKey] = Array.isArray(value) ? 'Array' : typeof value;
    }
  }
  return structure;
}

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();