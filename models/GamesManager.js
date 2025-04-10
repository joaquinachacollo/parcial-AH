import fs from "fs/promises";
import crypto from "crypto";
const path = './games.json';

class GamesManager {
    games = [];
    constructor(games = []) {
        this.games = games;
    }

    async getGames() {
        const data = await fs.readFile(path);
        this.games = JSON.parse(data);
        return this.games;
    }

    randomID(){
        return crypto.randomUUID();
    }

    async addGame(game){
        await this.getGames();
        game.id = this.randomID();
        this.games.push( game );
        
        const data = JSON.stringify( this.games, null, 2);
        try {
            await fs.writeFile( path, data );
            return game.id;
        } catch (error) {
            console.error(error);
        }
    }

    async getGameById(id){
        const games = await this.getGames();
        const game = games.find( u => u.id == id );
        return game ? game : undefined;
    }

    async deleteGameById(id){
        await this.getGames();
        const pos = this.games.findIndex( u => u.id == id);
        this.games.splice(pos, 1);

        const data = JSON.stringify( this.games, null, 2);
        try {
            await fs.writeFile( path, data );
            return true ? pos != -1 : false;
        } catch (error) {
            console.error(error);
        }
    }

    async updateGameById (id, game){
        await this.getGames();
        const pos = this.games.findIndex( u => u.id == id);
        this.games[pos].name = game.name;
        this.games[pos].gender = game.gender;
        this.games[pos].platform = game.platform;
        this.games[pos].release_date = game.release_date;
        this.games[pos].description = game.description;
        const data = JSON.stringify( this.games, null, 2);
        try {
            await fs.writeFile( path, data );
            return game.id;
        } catch (error) {
            console.error(error);
        }
    }
}

export default GamesManager;





