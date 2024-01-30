const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require("./db")

const app = express()

const port = 3000
// const conn = mongoose.connection
// app.all('*', function(req,res,next){
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow,Methods', 'PUT,GET,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers','Content-Type')
//     next(); 
// })

const Sodas = mongoose.model('soda', {
    title: String
  });

app.use(express.json());
app.use(cors());

app.get("/",async (req,res)=>{
        console.log("Getting")
        try {
            const soda = new Sodas({title:'Dr Pepper'})
            await soda.save()
            console.log('sijala')
        } catch (error) {
            console.log("Pito", error)
        }
})
app.get("/a", async (req,res)=>{
    console.log("Posting")
    try {
        const soda = await Sodas.find();
        res.json(soda);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})
app.delete("/",(req,res)=>{
    console.log("deleting")
})
app.put("/",(req,res)=>{
    console.log("Putting")
})

app.listen(port, ()=>{
    console.log(`listeting to ${port}`)
})