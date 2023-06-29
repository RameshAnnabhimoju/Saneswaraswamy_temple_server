import { Router } from "express";
import {
  createOrder,
  capturePayment,
  saveTransactionId,
} from "../controllers/payment.controller.js";
import verifyPaymentSignature from "../middlewares/verifyPaymentSignature.js";

const router = Router();
router.post("/createOrder", createOrder);
router.post("/capturePayment", verifyPaymentSignature, capturePayment);
router.post("/save", saveTransactionId);
export default router;
