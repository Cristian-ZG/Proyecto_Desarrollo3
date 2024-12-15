import { Request, Response } from 'express';
import { Review } from '../models/review';
import { Product } from '../models/product';

// Agregar review
export const newReview = async (req: Request, res: Response) => {

    const { product_id, user_name, rating, review_text } = req.body;

    try {
        // Validar que el producto existe
        const product = await Product.findByPk(product_id);
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
        await Review.create({
            product_id,
            user_name,
            rating,
            review_text
        });

        res.status(201).json({
            msg: 'La valoración fue agregada correctamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al intentar agregar la valoración.'
        });
    }
}

//Modificar review
export const updateReview = async (req:Request, res:Response) => {
    const { body } = req;
    const { review_id } = req.params;

    try {
        const product = await Review.findByPk(review_id);

        if(product){
            await product.update(body);
            res.json({
                msg: 'La opinion fue actulizada correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe una review con el id: ' + review_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Obtener reviews
export const getReviews = async (req: Request, res: Response) => {

    const listReviews = await Review.findAll();

    res.json(listReviews)
}

//Obtener una review especifica
export const getReview = async (req: Request, res: Response) => {

    const { review_id } = req.params;
    const review = await Review.findByPk(review_id);

    if (review){
        res.json(review)
    } else {
        res.status(404).json({
            msg: 'No existe una review con el id: ' + review_id
        })
    }
}

//Eliminar una review
export const deleteReview = async (req: Request, res: Response) => {

    const { review_id } = req.params;
    const review = await Review.findByPk(review_id);

    if(!review){
        res.status(404).json({
            msg: 'No existe una review con el id: ' + review_id
        })
    } else {
        await review.destroy();
        res.json({
            msg: 'La review fue eliminada correctamente.'
        })
    }
}