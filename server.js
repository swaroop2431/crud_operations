// const express = require('express');
// const app = express();

// app.use(express.json())

// app.get('/', (req, res)=> {
//     res.send('Hello World!')
// })

// const products = [
//     {
//         id: 1,
//         name: 'Laptop',
//         price: 1000
//     },
//     {
//         id: 2,
//         name: 'Tablet',
//         price: 500
//     },
//     {
//         id: 3,
//         name: 'Mobile',
//         price: 200
//     }
// ]

// app.get('/products', (req, res) => {
//     res.json(products)
// })


// app.get('/products/:id', (req, res) => {
//     const newData = products.filter(item => item.id.toString() === req.params.id)
//     return res.send(newData)
// })

// app.post('addproducts', (req, res) => {
//     const {id, name} = req.body;
//     console.log(id,name)
//     return res.send('Data Stored!!!')
// })

// app.listen(5000, ()=> console.log("Server running in the port 5000"))


const express = require('express');
const mongoose = require('mongoose');
const BrandName = require('./model');

const app = express();
app.use(express.json())

mongoose
  .connect("mongodb://127.0.0.1:27017/crudOperations", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.post('/addbrands', async (req, res) => {
    const {brandname} = req.body
    try{
        const newData = new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/getallbrands', async (req, res) => {
    try{
        const allData = await BrandName.find()
        return res.json(allData)
    }
    catch(err){
        console.log(err.message)
    }
})

app.get('/getallbrands/:id', async(req, res) => {
    try{
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data)
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete('/deletebrand/:id', async(req, res) => {
    try{
        await BrandName.findByIdAndDelete(req.params.id)
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(5000, () => console.log("Server running in the port 5000"))