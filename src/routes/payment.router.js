import { Router } from "express";
import { createOrder, capturePayment } from "../controllers/payment.controller";
import verifyPaymentSignature from "../middlewares/verifyPaymentSignature";

const router = Router();
router.post("/createOrder", createOrder);
router.post("/capturePayment", verifyPaymentSignature, capturePayment);
export default router;
