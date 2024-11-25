"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = exports.updateUser = exports.newUser = void 0;
const user_1 = require("../models/user");
// Agregar User
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    //Validacion si el Admin existe en la base de datos.
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el correo: ' + email
        });
    }
    try {
        //Guarda User en la base de datos.
        yield user_1.User.create({
            name: name,
            email: email,
        });
        res.json({
            msg: 'Usuario ' + name + ' creado exitosamente.'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newUser = newUser;
//Modificar Usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { user_id } = req.params;
    try {
        const user = yield user_1.User.findByPk(user_id);
        if (user) {
            yield user.update(body);
            res.json({
                msg: 'El usuario fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe un usuario con el id: ' + user_id
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.updateUser = updateUser;
//Obtener usuario
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.User.findAll();
    res.json(listUsers);
});
exports.getUsers = getUsers;
//Obtener un Usuario especifico
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const user = yield user_1.User.findByPk(user_id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({
            msg: 'No existe un usuario con el id: ' + user_id
        });
    }
});
exports.getUser = getUser;
