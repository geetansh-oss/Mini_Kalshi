import { Router } from "express";

import {signup, signin, onramp, profile, transactions} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/Authentication.js";

const router = Router();

router.post('/signup', authenticate(), signup());
router.post('/signin', authenticate(), signin());
router.post('/onramp', authenticate(), onramp());
router.get('/profile', authenticate(), profile());
router.get('/transactions', authenticate(), transactions());

export default router;