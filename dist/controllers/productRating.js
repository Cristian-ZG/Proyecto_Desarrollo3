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
exports.deleteRating = exports.getRating = exports.getRatings = exports.updateRating = exports.newRating = void 0;
const productRating_1 = require("../models/productRating");
// Agregar rating
const newRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield productRating_1.ProductRating.create(body);
        res.json({
            msg: 'El rating fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.newRating = newRating;
//Modificar rating
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { rating_id } = req.params;
    try {
        const rating = yield productRating_1.ProductRating.findByPk(rating_id);
        if (rating) {
            yield rating.update(body);
            res.json({
                msg: 'El rating fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe una rating con el id: ' + rating_id
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
exports.updateRating = updateRating;
//Obtener rating
const getRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRatings = yield productRating_1.ProductRating.findAll();
    res.json(listRatings);
});
exports.getRatings = getRatings;
//Obtener una ratingespecifica
const getRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating_id } = req.params;
    const rating = yield productRating_1.ProductRating.findByPk(rating_id);
    if (rating) {
        res.json(rating);
    }
    else {
        res.status(404).json({
            msg: 'No existe una rating con el id: ' + rating_id
        });
    }
});
exports.getRating = getRating;
//Eliminar una rating
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating_id } = req.params;
    const rating = yield productRating_1.ProductRating.findByPk(rating_id);
    if (!rating) {
        res.status(404).json({
            msg: 'No existe una rating con el id: ' + rating_id
        });
    }
    else {
        yield rating.destroy();
        res.json({
            msg: 'La rating fue eliminada correctamente.'
        });
    }
});
exports.deleteRating = deleteRating;
