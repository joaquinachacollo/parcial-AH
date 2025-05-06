import express from "express";
import {
    getDevelopers,
    getDeveloperById,
    getDeveloperByName,
    addDeveloper,
    updateDeveloper,
    deleteDeveloperById,
    getDevelopersByCountry
  } from "../controllers/developerController.js";
  import { validacionToken } from "../middlewares/auth.js";

  const router = express.Router();

  router.get('/', getDevelopers);
  router.get('/:id', validacionToken, getDeveloperById);
  router.get('/name/:name', getDeveloperByName);
  router.get('/country/:country', getDevelopersByCountry);
  router.post('/', addDeveloper);
  router.put('/:id', updateDeveloper);
  router.delete('/:id', validacionToken, deleteDeveloperById);
  
  export default router;  