import express, {Application} from 'express';
import cors from 'cors';
import routesUser from "../routes/user"
import routesProduct from "../routes/product";
import routesReview from "../routes/review";
import routesProductRating from "../routes/productRating"
import { User } from './user';
import { Product } from './product';
import { ProductRating } from './productRating';
import { Review } from './review';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto '+this.port);
        })
    }

    routes(){
        this.app.use('/api/user', routesUser);
        this.app.use('/api/product', routesProduct);
        this.app.use('/api/review', routesReview);
        this.app.use('/api/productRating', routesProductRating);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());
        //Cors
        this.app.use(cors());
    }

    async dbConnect(){

        try {
            await User.sync();
            await Product.sync();
            await ProductRating.sync();
            await Review.sync();
            console.log('Base de datos conectada correctamente.')
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;