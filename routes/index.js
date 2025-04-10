// Importamos cada ruta
import gameRoutes from "./gamesRouter.js";

function routerAPI( app ){
    console.log('Rutas')
    // Definimos cada
    app.use('/api/games', gameRoutes );
    // app.use('/api/products', productsRouter );

}

export default routerAPI;




