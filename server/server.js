import express from "express";
const PORT =3000
const app = express()

app.get("/",(req,res)=>{
    res.send("Hey welcome to server site")
})

app.listen(3000,(req,res)=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
    
})