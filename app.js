const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/seeddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
  const seeds = await Seed.find();
  res.json(seeds);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
