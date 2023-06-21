import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
export default function verifyPaymentSignature(request, response, next) {
  const { paymentId, razorpay_signature, razorpay_order_id } = request.body;
  try {
    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_TEST_KEY_SECRET
    );
    const hmac_data = hmac.update(razorpay_order_id + "|" + paymentId);
    const generated_signature = hmac_data.digest("hex");
    if (razorpay_signature === generated_signature) {
      // response.status(200).json({ message: "payment signature verified" });
      return next();
    } else {
      return response
        .status(400)
        .json({ message: "payment signature is not verified" });
    }
  } catch (error) {
    return response.status(500).json(error);
  }
}
