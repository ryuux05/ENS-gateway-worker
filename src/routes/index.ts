import express from "express";
import controller from "../controllers/index";

const router = express.Router();

router.get("/check", controller.serverHealthCheck);
router.post("/register", controller.registerSuccesfullTransaction);
router.get("/getHistory", controller.getUserPaymentHistory);
router.post(
  "/getHistoryWithSignature",
  controller.getUserPaymentHistoryWithSignature
);

export = router;
