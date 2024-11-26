import express from "express"
import cors from "cors"
import "dotenv/config" 

// App config 
const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use(cors())

// API endpoints

app.get('/', (req, res)=>{
    res.send("API working")
})

app.listen(port, ()=>{console.log(`Server started listening on port - ${port}`)})