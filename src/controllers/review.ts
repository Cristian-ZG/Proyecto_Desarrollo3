import { Request, Response } from 'express';
import { Review } from '../models/review';

// Agregar review
export const newReview = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await Review.create(body);
        res.json({
            msg: 'La opinion fue agregada correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
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