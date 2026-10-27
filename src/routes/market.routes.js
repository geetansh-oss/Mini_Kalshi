import {Router} from "express";

import { authenticate } from "../middleware/Authentication";
import { Create_Market, get_Market, create_bet, get_bets } from "../controllers/market.controller";

const router = Router();

router.post("/market", authenticate(), Create_Market());
router.get("/market", authenticate(), get_Market());
router.post("/bet", authenticate(), create_bet());
router.get("/bet", authenticate(), get_bets());


export default router;