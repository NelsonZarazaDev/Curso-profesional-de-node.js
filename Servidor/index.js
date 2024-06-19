const express = require('express');
const app = express();

const PORT = 3000;

app.get("/",(req, res)=>{
    res.send("Hola mundo");
});

app.get("/json",(req,res)=>{
    res.json({mensaje: "Hola Mundo!"})
})

app.listen(PORT, ()=>console.log(`Servidor corriente en el puerto http://localhost:${PORT}`))