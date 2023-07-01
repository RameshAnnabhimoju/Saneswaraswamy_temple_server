import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (request, response) => {
  const { username, password } = request.body;
  const token = jwt.sign(
    { username, password },
    process.env.WEB_TOKEN_PRIVATE_KEY
  );
  try {
    if (username !== "ADMIN-123" && password !== "Welcome@123") {
      return response.status(401).json({
        status: "failure",
        message: "Login failed",
        error: "Invalid Username and Password",
      });
    }
    if (username !== "ADMIN-123") {
      return response.status(401).json({
        status: "failure",
        message: "Login failed",
        error: "Invalid Username",
      });
    }
    if (password !== "Welcome@123") {
      return response.status(401).json({
        status: "failure",
        message: "Login failed",
        error: "Invalid password",
      });
    }
    return response.status(200).json({
      status: "success",
      message: "Login Successful",
      data: { token },
    });
  } catch (error) {
    return response.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error,
    });
  }
};
