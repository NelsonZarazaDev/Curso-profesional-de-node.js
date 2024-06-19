const express = require('express');
const cookiParser = require("cookie-parser")
const app = express();

const PORT = 3000;

//Cuando mandemos un json debemos tratar el cuerpo como ese mensaje como json
app.use(express.json());
//Cuando nos envian cookies podesmos usar y modificar esas cookis de forma rapido
app.use(cookiParser());

app.get("/",(req, res)=>{
    res.send("Hola mundo");
});

app.get("/json",(req,res)=>{
    res.json({mensaje: "Hola Mundo!"})
})

app.post("/request/:id,", (req, res)=>{
    const requestObject ={
        body:req.body,
        cookies:req.cookies,
        hostname: req.hostname,
        ip: req.ip,
        method: req.method,
        params: req.params,
        path: req.protocol,
        query: req.query,
        secure: req.secure,
        contentType: req.get("Content-Type"),
        isJson: req.is("json"),  //Pegunta si lo que estoy recibiendo en un json
    };
    res.json(requestObject);
})

app.listen(PORT, ()=>console.log(`Servidor corriente en el puerto http://localhost:${PORT}`))