import express from "express";
import controller from "../controllers/index";

const router = express.Router();

router.get("/check", controller.serverHealthCheck);
router.post("/register", controller.registerSuccesfullTransaction);
router.get("/getHistory", controller.getUserPaymentHistory);
router.get(
  "/getHistoryWithSignature",
  controller.getUserPaymentHistoryWithSignature
);

export = router;
