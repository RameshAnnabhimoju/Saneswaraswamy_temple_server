import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuid } from "uuid";
const unique_id = uuid();
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY_ID,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
});
export async function createOrder(request, response) {
  try {
    const order_id = unique_id.slice(0, 16);
    const [amount, currency, receipt, payment_capture] = request.body;
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
}

export async function capturePayment(request, response) {
  try {
    //paymentId:razorpay_payment_id in front-end
    await razorpayInstance.payments
      .capture(request)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  } catch (error) {
    return response.status(500).json(error);
  }
}
