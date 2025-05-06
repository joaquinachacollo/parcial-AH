import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const secret_key = process.env.SECRET_KEY;

//validamos 
const validacionToken = (request,response,next) => {
    const auth = request.headers.authorization;

    if (!auth){
        response.status(401).json({msg: "No se paso el jwt"});
    }

    const token = auth.split(' ')[1];

    JsonWebToken.verify(token, secret_key, ( error,decoded ) => {
        if (error) {
            response.status(403).json({msg: "Token invalido"})
        }
        request.body.userId = decoded.id;
        next();
    })
    
}
export {validacionToken}