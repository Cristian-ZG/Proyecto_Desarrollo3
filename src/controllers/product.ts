import { Request, Response } from 'express';
import { Product } from '../models/product';

// Agregar producto
export const newProduct = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await Product.create(body);
        res.json({
            msg: 'El producto fue agregado correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Modificar producto
export const updateProduct = async (req:Request, res:Response) => {
    const { body } = req;
    const { product_id } = req.params;

    try {
        const product = await Product.findByPk(product_id);

        if(product){
            await product.update(body);
            res.json({
                msg: 'El producto fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe un producto con el id: ' + product_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Obtener Productos
export const getProducts = async (req: Request, res: Response) => {

    const listProducts = await Product.findAll();

    res.json(listProducts)
}

//Obtener un producto especifico
export const getProduct = async (req: Request, res: Response) => {

    const { product_id } = req.params;
    const product = await Product.findByPk(product_id);

    if (product){
        res.json(product)
    } else {
        res.status(404).json({
            msg: 'No existe un producto con el id: ' + product_id
        })
    }
}