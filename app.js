import express from "express";
import routerAPI from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(express.static('public'))

app.get('/',(req,res) => {
    console.log("hola mundo");
    res.send('home')
})

//llamamos a nuestras rutas

routerAPI(app)

app.listen(port,() => {
    console.log(`Servidor corriendo en puerto ${port}`);
})


