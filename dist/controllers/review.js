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
// Agregar review
const newReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield review_1.Review.create(body);
        res.json({
            msg: 'La opinion fue agregada correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
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
