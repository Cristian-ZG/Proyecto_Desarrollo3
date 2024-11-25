import { Router } from 'express';
import { getUser, getUsers, newUser, updateUser } from '../controllers/user';

const router = Router();

router.post('/', newUser)
router.get('/', getUsers);
router.get('/:user_id', getUser);
router.put('/:user_id', updateUser);

export default router;