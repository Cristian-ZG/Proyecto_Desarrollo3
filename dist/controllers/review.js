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
exports.deleteReview = exports.getReview = exports.getReviews = exports.updateReview = exports.newReview = void 0;
const review_1 = require("../models/review");
const product_1 = require("../models/product");
// Agregar review
const newReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, user_name, rating, review_text } = req.body;
    try {
        // Validar que el producto existe
        const product = yield product_1.Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                msg: `El producto con ID ${product_id} no existe.`
            });
        }
        // Validar que el rating este dentro del rango permitido
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                msg: 'El rating debe estar entre 1 y 5.'
            });
        }
        // Crear la nueva review
        yield review_1.Review.create({
            product_id,
            user_name,
            rating,
            review_text
        });
        res.status(201).json({
            msg: 'La valoración fue agregada correctamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al intentar agregar la valoración.'
        });
    }
});
exports.newReview = newReview;
//Modificar review
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { review_id } = req.params;
    try {
        const product = yield review_1.Review.findByPk(review_id);
        if (product) {
            yield product.update(body);
            res.json({
                msg: 'La opinion fue actulizada correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe una review con el id: ' + review_id
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
exports.updateReview = updateReview;
//Obtener reviews
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listReviews = yield review_1.Review.findAll();
    res.json(listReviews);
});
exports.getReviews = getReviews;
//Obtener una review especifica
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { review_id } = req.params;
    const review = yield review_1.Review.findByPk(review_id);
    if (review) {
        res.json(review);
    }
    else {
        res.status(404).json({
            msg: 'No existe una review con el id: ' + review_id
        });
    }
});
exports.getReview = getReview;
//Eliminar una review
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { review_id } = req.params;
    const review = yield review_1.Review.findByPk(review_id);
    if (!review) {
        res.status(404).json({
            msg: 'No existe una review con el id: ' + review_id
        });
    }
    else {
        yield review.destroy();
        res.json({
            msg: 'La review fue eliminada correctamente.'
        });
    }
});
exports.deleteReview = deleteReview;
