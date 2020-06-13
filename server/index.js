const express = require('express')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())
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


app.get('/api/cows', (req, res) => {
    console.log(req.body) 
})

app.post('/api/cows' , (req,res) => {
    let id,name,desc;
    for(let key in req.body){
        id = Number(key)
        name = Object.keys(req.body[key])[0]
        desc = Object.values(req.body[key])[0]
    }
    let newCow = new Cow({
        _id: id,
        name: name,
        description: desc
    })
    newCow.save((err)=> (err) ? console.log(err) : console.log('saved'))
    res.sendStatus(201)
})


app.put('/api/cows/:id', (req, res) =>{
    let cow = req.params.id
    Cow.findByIdAndUpdate(cow, req.body,(err, doc) =>{
        if(err) console.log(err)
        else{
            doc.name = Object.keys(req.body)[0]
            doc.description = Object.values(req.body)[0]
            doc.save((err)=> (err) ? console.log(err) : console.log('updated'))
        }
    })
    res.sendStatus(200)
})

app.delete('/api/cows/:id', (req,res) =>{
    let name = Object.keys(req.body)[0]
    Cow.deleteOne({name}).exec((err)=> (err) ? console.log(err) : console.log('deleted'))
    res.sendStatus(200)
})



















app.listen(port, () => console.log(`Example app listening on port ${port}!`))