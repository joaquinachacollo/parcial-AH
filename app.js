import express from "express";

const port = 5000;
const app = express();

app.use(express.json());


app.listen(port,() => {
    console.log(`Servidor corriendo en puerto ${port}`);
})


