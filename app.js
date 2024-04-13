const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Note = require('./routes/note')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/note', Note);

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/my_note_keeper', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

connectToDb();

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});