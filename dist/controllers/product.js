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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductWithRating = exports.getProductsWithRatings = exports.getProduct = exports.getProducts = exports.updateProduct = exports.newProduct = void 0;
const product_1 = require("../models/product");
const review_1 = require("../models/review");
const connection_1 = __importDefault(require("../db/connection"));
// Agregar producto
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield product_1.Product.create(body);
        res.json({
            msg: 'El producto fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.newProduct = newProduct;
//Modificar producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { product_id } = req.params;
    try {
        const product = yield product_1.Product.findByPk(product_id);
        if (product) {
            yield product.update(body);
            res.json({
                msg: 'El producto fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe un producto con el id: ' + product_id
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
exports.updateProduct = updateProduct;
//Obtener Productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.Product.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
//Obtener un producto especifico
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    const product = yield product_1.Product.findByPk(product_id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: 'No existe un producto con el id: ' + product_id
        });
    }
});
exports.getProduct = getProduct;
const getProductsWithRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.findAll({
            attributes: ["product_id", "name", "description", "price",
                [
                    connection_1.default.fn("IFNULL", connection_1.default.fn("ROUND", connection_1.default.fn("AVG", connection_1.default.col("Reviews.rating"))), 0), "average_rating",
                ],
                [
                    connection_1.default.fn("IFNULL", connection_1.default.fn("COUNT", connection_1.default.col("Reviews.review_id")), 0), "rating_count",
                ],
            ],
            include: [
                {
                    model: review_1.Review,
                    attributes: [],
                },
            ],
            group: ["Product.product_id"],
        });
        res.json({
            products,
        });
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({
            msg: "Error al obtener productos.",
        });
    }
});
exports.getProductsWithRatings = getProductsWithRatings;
const getProductWithRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params; // Se obtiene el product_id desde los parámetros de la ruta
    try {
        const product = yield product_1.Product.findOne({
            attributes: ["product_id", "name", "description", "price",
                [
                    connection_1.default.fn("IFNULL", connection_1.default.fn("ROUND", connection_1.default.fn("AVG", connection_1.default.col("Reviews.rating"))), 0), "average_rating",
                ],
                [
                    connection_1.default.fn("IFNULL", connection_1.default.fn("COUNT", connection_1.default.col("Reviews.review_id")), 0), "rating_count",
                ],
            ],
            include: [
                {
                    model: review_1.Review,
                    attributes: [],
                },
            ],
            where: { product_id }, // Filtra por el producto específico
            group: ["Product.product_id"],
        });
        if (!product) {
            return res.status(404).json({
                msg: "Producto no encontrado.",
            });
        }
        res.json({
            product,
        });
    }
    catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({
            msg: "Error al obtener el producto.",
        });
    }
});
exports.getProductWithRating = getProductWithRating;
