import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret_key = process.env.SECRET_KEY;

const salt = 10;

const auth = async(request, response) => {
    const { email, password } = request.body;

    // Buscamos el usuario por su email
    const user = await User.findOne({ email: email });

    if (!user) {
        return response.status(404).json({ msg: "El usuario es inválido" });
    }

    // Comparamos la contraseña enviada con la guardada en la base de datos
    const passOk = await bcrypt.compare(password, user.password);

    if (!passOk) {
        return response.status(404).json({ msg: "Contraseña inválida" });
    }

    // Si las credenciales son correctas, generamos el token
    const data = {
        id: user._id,
        email: user.email
    };

    const jwt = jsonwebtoken.sign(data, secret_key, { expiresIn: '1h' });

    response.json({ msg: "Credenciales correctas", token: jwt });
};


const getUsers = async(request, response) => {
    const users = await User.find(); // Trae todos los usuarios
    response.status(200).json(users);
};

const getUserById = async(request, response) => {
    const id = request.params.id;

    // Busca el usuario por su ID
    const userNew = await User.findById(id);

    if (userNew) {
        response.status(200).json(userNew);
    } else {
        response.status(404).json({ msg: 'No se encontró el usuario' });
    }
};

const addUser = async(request, response) => {
    const user = request.body;

    // Validamos que estén todos los campos requeridos
    if (!user.name || !user.email || !user.password) {
        return response.status(403).json({ msg: "Faltan parámetros" });
    }

    console.log({ user });

    // Encriptamos la contraseña antes de guardarla
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;

    // Creamos una nueva instancia del modelo y la guardamos
    const doc = new User(user);
    await doc.save();

    response.json({
        msg: "Usuario creado",
        data: { id: doc._id, name: doc.name }
    });
};

const updateUser = async(request, response) => {
    const id = request.params.id;
    const user = request.body;

    // Actualizamos el usuario por ID y devolvemos el nuevo documento actualizado
    const newUser = await User.findByIdAndUpdate(id, user, { new: true });

    console.log({ newUser });

    if (newUser) {
        response.json({ msg: 'Usuario actualizado', data: { newUser } });
    } else {
        response.status(404).json({ msg: 'No se encontró el usuario' });
    }
};

const deleteUser = async(request, response) => {
    const id = request.params.id;

    // Eliminamos el usuario por su ID
    const status = await User.findByIdAndDelete(id);
    console.log({ status });

    if (status) {
        response.json({ msg: 'Usuario eliminado' });
    } else {
        response.status(404).json({ msg: 'No se encontró el usuario' });
    }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser, auth };
