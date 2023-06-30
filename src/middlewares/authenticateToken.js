import jwt from "jsonwebtoken";

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({
      status: "failed",
      message: "Authentication Failed",
      error: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      return response.status(403).json({
        status: "failed",
        message: "Authentication Failed",
        error: "Invalid token",
      });
    }

    // Attach the user object to the request for further use in the route handler
    request.data = data;

    next();
  });
};

export default authenticateToken;
