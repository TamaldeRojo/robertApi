const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require("./db")

const app = express()

const port = 3000
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
            const soda = await Sodas.find();
            res.json(soda);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    })

app.post("/", async (req,res)=>{
    console.log("Posting")
    try {
        console.log(req.body)
        const soda = new Sodas({title:req.body.title})
        await soda.save()
        res.json(soda);
        console.log('sijala')
    } catch (error) {
        console.log("Pito", error)
    }
   
})
app.delete("/",async (req,res) => {
    console.log("deleting")
    console.log(req.body)

    const soda = await Sodas.deleteOne({ _id: req.body.id })
    res.json(soda)
    })
app.put("/",async (req,res)=>{
    console.log("Putting")
    try {
        const updatedSoda = await Sodas.findByIdAndUpdate(
            req.body.id,
            { title: req.body.title },
            { new: true }
        );

        if (!updatedSoda) {
            return res.status(404).json({ message: "Soda not found" });
        }

        res.json(updatedSoda);
    } catch (error) {
        
    }
})

app.listen(port, ()=>{
    console.log(`listeting to ${port}`)
})