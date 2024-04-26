const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect('mongodb+srv://elliesgood00:12345@cluster0.ipa67xl.mongodb.net/seeddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


const seedSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Seed = mongoose.model('Seed', seedSchema);


app.get('/seeds', async (req, res) => {
  try {
    const seeds = await Seed.find();
    res.json(seeds);
  } catch (error) {
    console.error('Error fetching seeds:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
