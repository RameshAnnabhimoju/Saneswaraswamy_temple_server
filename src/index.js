import express from "express";
import cors from "cors";
import paymentRouter from "./routes/payment.router.js";
const app = express();
app.use(cors({ origin: process.env.DEV_URL, credentials: true }));
app.use("payment", paymentRouter);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
