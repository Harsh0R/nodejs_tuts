import express from 'express';
import { handleGeneratNewShoetURL, handleGetShoetURL, handleGetAnalytics } from '../controllers/url';
const router = express.Router();

router.post('/', handleGeneratNewShoetURL)
router.get('/:shortId', handleGetShoetURL)
router.get('/analytics/:shortId', handleGetAnalytics)

export default router