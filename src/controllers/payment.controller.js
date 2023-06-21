import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY_ID,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
});
export const createOrder = async (request, response) => {
  const order_id = crypto.randomUUID();
  const { amount, currency, receipt, payment_capture } = request.body;
  try {
    await razorpayInstance.orders
      .create({ amount, currency, receipt, payment_capture })
      .then((result) => {
        return response.status(200).json({ ...result, order_id });
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const capturePayment = async (request, response) => {
  const { paymentId, amount, currency } = request.body;
  try {
    //paymentId:razorpay_payment_id in front-end
    await razorpayInstance.payments
      .capture(paymentId, amount, currency)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  } catch (error) {
    return response.status(500).json(error);
  }
};
