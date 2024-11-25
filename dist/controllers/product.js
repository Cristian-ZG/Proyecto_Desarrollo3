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
exports.getProduct = exports.getProducts = exports.updateProduct = exports.newProduct = void 0;
const product_1 = require("../models/product");
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
