const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb+srv://MohamedB-Dev:"+ process.env.MONGO_ATLAS_PW +"@cluster0.qnksxel.mongodb.net/node-angular")
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

const notesRoutes = require('./routes/notes');
app.use('/notes', notesRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);


module.exports = app;
