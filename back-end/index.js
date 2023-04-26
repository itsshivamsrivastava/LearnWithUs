const connectToMongo = require('./db');

connectToMongo();

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tutorials', require('./routes/tutorials'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/bookshelf', require('./routes/bookshelf'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`LearnWithUs Website listening at http://localhost:${port}`)
})