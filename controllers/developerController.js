import Developer from "../models/developerModel.js";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const salt = 10;
const secret_key = process.env.SECRET_KEY;

const auth = async (request, response) => {
    const { name, country } = request.body;

    // Buscamos el juego por su nombre
    const developer = await Developer.findOne({ name: name });

    // Comparamos el "country" enviado con el encriptado
      const passOk = await bcrypt.compare(country, developer.country);

    if (!passOk) {
        return response.status(404).json({ msg: "País inválido" });
    }

    // Creamos el JWT si pasa la validación
    const data = {
        id: developer._id,
        country: developer.name
    };

    const jwt = JsonWebToken.sign(data, secret_key, { expiresIn: '5h' });

    response.json({ msg: "credenciales correctas", token: jwt });
};

const getDevelopers = async (request, response) => {
    const developers = await Developer.find();
    response.status(200).json(developers);
};

const getDeveloperById = async (request, response) => {
    const id = request.params.id;
    const developer = await Developer.findById(id);
    if (developer) {
        response.status(200).json(developer);
    } else {
        response.status(404).json({ msg: 'No se encontró el desarrollador' });
    }
};

const getDeveloperByName = async (req, res) => {
    const { name } = req.params;

    try {
        const developer = await Developer.findOne({ name: new RegExp("^" + name + "$", "i") });

        if (!developer) {
            return res.status(404).json({ msg: "Desarrollador no encontrado" });
        }

        res.json(developer);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar el desarrollador", error });
    }
};

const getDevelopersByCountry = async (req, res) => {
    const { country } = req.params;

    try {
        const developers = await Developer.find({ country: { $regex: new RegExp(country, "i") } });

        if (developers.length === 0) {
            return res.status(404).json({ msg: "No se encontraron desarrolladores para este país" });
        }

        res.json(developers);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar por país", error });
    }
};

const addDeveloper = async (request, response) => {
    const developer = request.body;
    if (!developer.name || !developer.country || !developer.founded || !developer.description) {
        return response.status(403).json({ msg: "Faltan parámetros" });
    }

    const passwordHash = await bcrypt.hash(developer.country, salt);
    developer.country = passwordHash;

    const doc = new Developer(developer);
    await doc.save();
    response.json({ msg: "Desarrollador creado", data: { id: doc._id, name: doc.name } });
};

const updateDeveloper = async (request, response) => {
    const id = request.params.id;
    const developer = request.body;

    const updated = await Developer.findByIdAndUpdate(id, developer, { new: true });

    if (updated) {
        response.status(200).json({ msg: "Desarrollador actualizado", data: updated });
    } else {
        response.status(404).json({ msg: "No se encontró el desarrollador" });
    }
};

const deleteDeveloperById = async (request, response) => {
    const id = request.params.id;
    const status = await Developer.findByIdAndDelete(id);
    if (status) {
        response.json({ msg: "Desarrollador eliminado" });
    } else {
        response.status(404).json({ msg: "No se encontró el desarrollador" });
    }
};

export {
    getDevelopers,
    getDeveloperById,
    addDeveloper,
    updateDeveloper,
    deleteDeveloperById,
    auth,
    getDevelopersByCountry,
    getDeveloperByName
};
