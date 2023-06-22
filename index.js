import express from "express";
import cors from "cors";
import paymentRouter from "./src/routes/payment.router.js";
const app = express();
app.use(cors({ origin: process.env.DEV_URL, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (request, response) => {
  response.status(200).json({ message: "server working" });
});
app.use("/payment", paymentRouter);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
export default app;