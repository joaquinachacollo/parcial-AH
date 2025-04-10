import GamesManager from "../models/GamesManager.js";

const gameModel = new GamesManager();

const getGames = async( request, response) =>{
    const games = await gameModel.getGames();
    response.status(200).json( games);
}
const getGameById = async( request, response) => {
    const id = request.params.id;
    const game = await gameModel.getGameById(id);
    if ( game) {
        response.status(200).json( game );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const addGame = async(request, response) => {
    const game = request.body;
    console.log({game});
    const id = await gameModel.addGame(game);
    response.json( { id} );
}

const updateGame =  async (request, response)=>{
    response.json({})
}

const deleteGame =  async (request, response) => {
    const id = request.params.id;
    const status = await gameModel.deleteGameById(id);
    if ( status) {
        response.json( {msg: 'juego eliminado'} );
    } else {
        response.status(404).json({msg: 'No se encontro el juego'});
    }
}

export { getGames, getGameById, addGame, updateGame, deleteGame}