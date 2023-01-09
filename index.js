const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())
const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mzolur4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const database = client.db("online_shop");
        const productCollection = database.collection("products");

        // get api 
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            console.log(req.query);
            const page = req.query.page;
            const size = parseInt(req.query.size);
            const count = await cursor.count()
            let products;
            if (page) {
                products = await cursor.skip(page * size).limit(size).toArray()
            }
            else {
                products = await cursor.toArray()
            }
            res.json({ count, products });
            // console.log(products);
        })
    }
    finally {
        // await client.close()
    }
}
run(console.dir)


app.get('/', (req, res) => {
    res.send('Ema John Simple')

})
app.listen(port, () => {
    console.log('Listening port ', port);

})