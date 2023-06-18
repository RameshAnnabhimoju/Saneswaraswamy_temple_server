import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
export default function verifyPaymentSignature(request, response, next) {
  try {
    const [paymentId, order_id, razorpay_signature] = request.body;
    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_VERIFICATION_SECRET_KEY
    );
    const hmac_data = hmac.update(order_id + "|" + paymentId);
    const generated_signature = hmac_data.digest("hex");
    if (razorpay_signature === generated_signature) {
      response.status(200).json({ message: "payment signature verified" });
      next();
    } else {
      return response
        .status(400)
        .json({ message: "payment signature is not verified" });
    }
  } catch (error) {
    return response.status(500).json(error);
  }
}
