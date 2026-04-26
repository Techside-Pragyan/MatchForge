import { Router } from 'express';
import { getFeed, swipe } from '../controllers/matchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/feed', protect, getFeed);
router.post('/swipe', protect, swipe);

export default router;
