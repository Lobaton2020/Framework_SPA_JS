const express = require("express")
const path = require("path")
const app = express()

app.use("/static",express.static(path.resolve(__dirname,"frontend","static")))

app.get("/*",(req,res)=>{
    return res.sendFile(path.resolve("frontend","index.html"))
})
app.listen(3000,()=>console.log("Conectado por el puerto 3000"))

