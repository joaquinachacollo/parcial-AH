import Game from "../models/gameModel.js";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const salt = 10;
const secret_key = process.env.SECRET_KEY;


const auth = async (request, response) => {
  const { name, gender } = request.body;

  // Buscamos el juego por su nombre
  const game = await Game.findOne({ name: name });

  if (!game) {
      return response.status(404).json({ msg: "Género no encontrado" });
  }

  // Comparamos el "gender" enviado con el encriptado
  const passOk = await bcrypt.compare(gender, game.gender);

  if (!passOk) {
      return response.status(404).json({ msg: "genero inválido" });
  }

  // Creamos el JWT si pasa la validación
  const data = {
      id: game._id,
      name: game.name
  };

  const jwt = JsonWebToken.sign(data, secret_key, { expiresIn: "5h" });

  response.json({ msg: "credenciales correctas", token: jwt });
};



const getGames = async( request, response) =>{
    const games = await Game.find();
    response.status(200).json( games);
}
const getGameById = async( request, response) => {
    const id = request.params.id;
    const game = await Game.findById(id);
    if ( game) {
        response.status(200).json( game );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const getGameByName = async (req, res) => {
    const { name } = req.params;
  
    try {
      const game = await Game.findOne({ name: new RegExp("^" + name + "$", "i") });
  
      if (!game) {
        return res.status(404).json({ msg: "Juego no encontrado" });
      }
  
      res.json(game);
    } catch (error) {
      res.status(500).json({ msg: "Error al buscar el juego", error });
    }
  };

  const getGamesByPlatform = async(req,res) => {
    const { platform } = req.params;

  try {
    const games = await Game.find({ platform: { $regex: new RegExp(platform, "i") } });

    if (games.length === 0) {
      return res.status(404).json({ msg: "No se encontraron juegos para esta plataforma" });
    }

    res.json(games);
  } catch (error) {
    res.status(500).json({ msg: "Error al buscar juegos por plataforma", error });
  }
  }

const addGame = async(request, response) => {
    const game = request.body;
    if (!game.name || !game.gender || !game.platform || !game.release_date || !game.description) {
        return response.status(403).json({msg: "Faltan parametros"})
    }
    console.log({game});
    const passwordHash = await bcrypt.hash(game.gender, salt);
    game.gender = passwordHash;
    const doc = new Game(game);
    await doc.save();
    response.json( { msg: "juego creado", data: {id: doc._id, name: doc.name}} );
}

const updateGame =  async (request, response)=>{
    const id = request.params.id;
    const game = request.body
    const newGame = await Game.findByIdAndUpdate(id, game, {new: true})
    
    if ( newGame ) {
        response.status(200).json({ msg: "juego actualizado" , data :{newGame}});
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const deleteGameById =  async (request, response) => {
    const id = request.params.id;
    const status = await Game.findByIdAndDelete(id);
    if ( status) {
        response.json( {msg: 'juego eliminado'} );
    } else {
        response.status(404).json({msg: 'No se encontro el juego'});
    }
}

export { getGames, getGameById, addGame, updateGame, deleteGameById, auth, getGamesByPlatform ,getGameByName};