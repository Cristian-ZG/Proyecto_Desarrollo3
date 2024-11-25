import { Router } from 'express';
import { deleteReview, getReview, getReviews, newReview, updateReview } from '../controllers/review';

const router = Router();

router.post('/', newReview)
router.get('/', getReviews);
router.get('/:review_id', getReview);
router.put('/:review_id', updateReview);
router.delete('/:review_id', deleteReview);

export default router;