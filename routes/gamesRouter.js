import express from "express";
import {
    getGames,
    getGameById,
    addGame, 
    updateGame, 
    deleteGameById, 
    auth, 
    getGameByName,
    getGamesByPlatform
} from "../controllers/gameController.js" 
import { validacionToken } from "../middlewares/auth.js";

const router = express.Router();

// Rutas para los usuarios
router.get('/', getGames );
router.get('/:id',validacionToken, getGameById );
router.get("/name/:name", getGameByName);
router.get("/filter/platform/:platform",getGamesByPlatform);
router.post('/', addGame );
router.post('/auth', auth );
router.delete('/:id', validacionToken, deleteGameById );
router.put('/:id',updateGame);

export default router;