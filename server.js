const express = require('express');
const { connectDB } = require('./config/connectDB');
const user = require('./routes/user');
const pitch = require('./routes/pitch');

const app = express();

app.use(express.json());

connectDB();

app.use('/', user);
app.use('/', pitch);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => (err ? console.log('err') : console.log(`Server is Running on Port ${PORT}`)));
