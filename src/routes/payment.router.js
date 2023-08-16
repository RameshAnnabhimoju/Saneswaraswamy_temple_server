import { Router } from "express";
import {
  createOrder,
  capturePayment,
  saveTransactionId,
  getPayments,
} from "../controllers/payment.controller.js";
import verifyPaymentSignature from "../middlewares/verifyPaymentSignature.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = Router();
router.get("/payments", authenticateToken, getPayments);
router.post("/createOrder", createOrder);
router.post("/capturePayment", verifyPaymentSignature, capturePayment);
router.post("/save", saveTransactionId);
export default router;
