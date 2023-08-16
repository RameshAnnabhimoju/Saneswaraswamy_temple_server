import Razorpay from "razorpay";
import payment from "../model/payment.model.js";
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

export const saveTransactionId = async (request, response) => {
  try {
    await payment
      .create(request.body)
      .then((data) => {
        return response.status(200).json({
          status: "success",
          message: "Transaction ID saved successfully",
          data: data._id,
        });
      })
      .catch((error) => {
        return response.status(400).json({
          status: "failure",
          message: "Transaction ID save Failed",
          error,
        });
      });
  } catch (error) {
    return response.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error,
    });
  }
};
export const getPayments = async (request, response) => {
  const { startDate, endDate, columns } = request.query;
  // const resultsPerPage = 5;
  const givenEndDate = new Date(endDate);
  givenEndDate.setDate(givenEndDate.getDate() + 1);
  const defaultStartDate = new Date("2023-06-30");
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 1);
  // console.log(startDate, endDate);

  try {
    const searchStartDate = !!startDate
      ? new Date(startDate)
      : defaultStartDate;
    const searchEndDate = !!endDate ? givenEndDate : defaultEndDate;
    console.log(searchStartDate, searchEndDate);
    // if (isNaN(searchStartDate.getTime()) || isNaN(searchEndDate.getTime())) {
    //   return response.status(400).json({
    //     status: "failure",
    //     message: "Error retrieving payments",
    //     error: "Invalid date format",
    //   });
    // }
    // if (!!!page) {
    // console.log("startDate", searchStartDate, "EndDate", searchEndDate);
    await payment
      .find(
        {
          createdAt: { $gte: searchStartDate, $lte: searchEndDate },
        },
        columns
      )
      .sort({ createdAt: -1 })
      .then((data) => {
        return response.status(200).json({
          status: "success",
          message: "Payments retrived successfully",
          data: {
            payments: data,
          },
        });
      })
      .catch((error) => {
        return response.status(400).json({
          status: "failure",
          message: " Error",
          error,
        });
      });
    // }
    // const currentPage = parseInt(page) || 1;

    // if (currentPage <= 0) {
    //   currentPage = 1;
    // }

    // const skip = (currentPage - 1) * resultsPerPage;

    // const query = payment.find({
    //   createdAt: { $gte: searchStartDate, $lte: searchEndDate },
    // });

    // const payments = await query.skip(skip).limit(resultsPerPage);
    // const totalCount = await payment.countDocuments({
    //   createdAt: { $gte: searchStartDate, $lte: searchEndDate },
    // });

    // const startRange = skip + 1;
    // const endRange = Math.min(skip + resultsPerPage, totalCount);

    // return response.status(200).json({
    //   status: "success",
    //   message: "Payments retrived successfully",
    //   data: {
    //     payments,
    //     // totalCount,
    //     // startRange,
    //     // endRange,
    //   },
    // });
  } catch (error) {
    return response.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error,
    });
  }
};

export const convert = async (request, response) => {
  try {
    await payment
      .find({})
      .then((result) => {
        result.forEach(async (value) => {
          await payment.findOneAndUpdate(
            { _id: value._id },
            { poojaDate: Date(value.poojaDate) }
          );
        });
        return response.status(200).json({
          status: "success",
          message: "pooja Dates changed successfully",
        });
      })
      .catch((error) => {
        return response.status(400).json({
          status: "failure",
          message: " Error",
          error,
        });
      });
  } catch (error) {
    return response.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error,
    });
  }
};
