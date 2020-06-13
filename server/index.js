const express = require('express')
const mongoose =require('mongoose')
const app = express()
const port = 3000
mongoose.connect('mongodb://localhost/cowlist')

let cowSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String
})

let Cow = mongoose.model('cows', cowSchema)

app.use(express.static('./client/dist'))

app.get('/', (req, res) => {
    res.send('index').status(200)
})


app.get('/api/cows', (req, res) =>{
    console.log('hello from cows get')
    res.send('hi')
})

app.post('/api/cows' , (req,res) => {
    console.log('hello from cows post')
})
















app.listen(port, () => console.log(`Example app listening on port ${port}!`))