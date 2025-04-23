import express from "express";
import routerAPI from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dburi = process.env.MONGODB_URI;
const port = process.env.PORT;
const app = express();
 
// Conexion con la DB
mongoose.connect(dburi)
const db = mongoose.connection;

db.on('error', () => { console.error( 'error' ) } );

db.once('open', () => { console.log('Conexion con la Db Correcta')} );

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


