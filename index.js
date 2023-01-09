const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors())

const port = 5000;


app.get('/', (req, res) => {
    res.send('Ema John Simple')
})

app.listen(port, () => {
    console.log('Listening port ', port);
})