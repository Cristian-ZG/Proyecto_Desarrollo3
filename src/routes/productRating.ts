import { Router } from 'express';
import { deleteRating, getRating, getRatings, newRating, updateRating } from '../controllers/productRating';


const router = Router();

router.post('/', newRating)
router.get('/', getRatings);
router.get('/:rating_id', getRating);
router.put('/:rating_id', updateRating);
router.delete('/:rating_id', deleteRating);

export default router;