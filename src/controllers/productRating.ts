import { Request, Response } from 'express';
import { ProductRating } from '../models/productRating';

// Agregar rating
export const newRating = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await ProductRating.create(body);
        res.json({
            msg: 'El rating fue agregado correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Modificar rating
export const updateRating = async (req:Request, res:Response) => {
    const { body } = req;
    const { rating_id } = req.params;

    try {
        const rating = await ProductRating.findByPk(rating_id);

        if(rating){
            await rating.update(body);
            res.json({
                msg: 'El rating fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe una rating con el id: ' + rating_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Obtener rating
export const getRatings = async (req: Request, res: Response) => {

    const listRatings = await ProductRating.findAll();

    res.json(listRatings)
}

//Obtener una ratingespecifica
export const getRating = async (req: Request, res: Response) => {

    const { rating_id } = req.params;
    const rating = await ProductRating.findByPk(rating_id);

    if (rating){
        res.json(rating)
    } else {
        res.status(404).json({
            msg: 'No existe una rating con el id: ' + rating_id
        })
    }
}

//Eliminar una rating
export const deleteRating = async (req: Request, res: Response) => {

    const { rating_id } = req.params;
    const rating = await ProductRating.findByPk(rating_id);

    if(!rating){
        res.status(404).json({
            msg: 'No existe una rating con el id: ' + rating_id
        })
    } else {
        await rating.destroy();
        res.json({
            msg: 'La rating fue eliminada correctamente.'
        })
    }
}