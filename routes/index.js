// Importamos cada ruta
import gameRoutes from "./gamesRouter.js";
import developersRouter from "./developersRouter.js"
import usersRouter from "./users.Router.js"

function routerAPI( app ){
    // Definimos cada
    app.use('/api/games', gameRoutes );
    app.use('/api/developers', developersRouter)
    app.use('/api/users', usersRouter );
}

export default routerAPI;




