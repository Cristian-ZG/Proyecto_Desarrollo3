import { Request, Response } from 'express';
import { Product } from '../models/product';
import { Review } from '../models/review';
import sequelize from '../db/connection';

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

export const getProductsWithRatings = async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll({
        attributes: ["product_id","name","description","price",
          [
            sequelize.fn("IFNULL",sequelize.fn("ROUND",sequelize.fn("AVG", sequelize.col("Reviews.rating"))),0),"average_rating",
          ],
          [
            sequelize.fn("IFNULL",sequelize.fn("COUNT", sequelize.col("Reviews.review_id")),0),"rating_count",
          ],
        ],
        include: [
          {
            model: Review,
            attributes: [],
          },
        ],
        group: ["Product.product_id"],
      });
  
      res.json({
        products,
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({
        msg: "Error al obtener productos.",
      });
    }
  };

  export const getProductWithRating = async (req: Request, res: Response) => {
    const { product_id } = req.params; // Se obtiene el product_id desde los parámetros de la ruta
  
    try {
      const product = await Product.findOne({
        attributes: ["product_id","name","description","price",
          [
            sequelize.fn("IFNULL",sequelize.fn("ROUND",sequelize.fn("AVG", sequelize.col("Reviews.rating"))),0),"average_rating",
          ],
          [
            sequelize.fn("IFNULL",sequelize.fn("COUNT", sequelize.col("Reviews.review_id")),0),"rating_count",
          ],
        ],
        include: [
          {
            model: Review,
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
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).json({
        msg: "Error al obtener el producto.",
      });
    }
  };