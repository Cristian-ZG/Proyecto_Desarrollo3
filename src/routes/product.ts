import { Router } from 'express';
import { getProduct, getProducts, newProduct, updateProduct } from '../controllers/product';

const router = Router();

router.post('/', newProduct)
router.get('/', getProducts);
router.get('/:product_id', getProduct);
router.put('/:product_id', updateProduct);

export default router;