const connectToMongo = require('./db');
const express = require('express');
require('dotenv').config();
var cors = require('cors');
connectToMongo();

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})