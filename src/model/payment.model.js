import { model, Schema } from "mongoose";
const paymentSchema = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    poojaName: { type: String },
    pooja: { type: String },
    poojaDate: { type: String },
    occasion: { type: String },
    amount: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    mobile: { type: String, required: true },
    paymentType: { type: String, required: true },
    paymentMode: { type: String, required: true },
    loggedin: { type: Boolean, default: false },
    transactionId: { type: String },
  },
  { timestamps: true }
);
const payment = model("payments", paymentSchema);
export default payment;
