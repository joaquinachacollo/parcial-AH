import express from "express";
import {getGames, getGameById, addGame, updateGame, deleteGame} from "../controllers/gameController.js" 

const router = express.Router();

// Rutas para los usuarios
router.get('/', getGames )
router.get('/:id', getGameById )
router.post('/', addGame )
router.delete('/:id', deleteGame )
router.put('/:id', updateGame)

export default router;