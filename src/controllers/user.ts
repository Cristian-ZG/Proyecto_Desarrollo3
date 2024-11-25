import { Request, Response } from 'express';
import { User } from '../models/user';

// Agregar User
export const newUser = async (req: Request, res: Response) => {

    const { name, email } = req.body;

    //Validacion si el Admin existe en la base de datos.
    const user = await User.findOne({where:{email: email}})

    if(user){
        return res.status(400).json({
            msg: 'Ya existe un usuario con el correo: ' + email
        })
    }
    
    try {
        //Guarda User en la base de datos.
        await User.create({
            name: name,
            email: email,
        })
        res.json({
            msg: 'Usuario ' + name + ' creado exitosamente.'
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}

//Modificar Usuario
export const updateUser = async (req:Request, res:Response) => {
    const { body } = req;
    const { user_id } = req.params;

    try {
        const user = await User.findByPk(user_id);

        if(user){
            await user.update(body);
            res.json({
                msg: 'El usuario fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe un usuario con el id: ' + user_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Obtener usuario
export const getUsers = async (req: Request, res: Response) => {

    const listUsers = await User.findAll();

    res.json(listUsers)
}

//Obtener un Usuario especifico
export const getUser = async (req: Request, res: Response) => {

    const { user_id } = req.params;
    const user = await User.findByPk(user_id);

    if (user){
        res.json(user)
    } else {
        res.status(404).json({
            msg: 'No existe un usuario con el id: ' + user_id
        })
    }
}