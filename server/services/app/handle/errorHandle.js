const errorHandle = (err, request, response, next) => {
  console.log(err), "============ error handler";
  if (err.name === "SequelizeValidationError") {
    response.status(400).json({
      statusCode: 400,
      message: err.errors[0].message,
      // message: err.errors
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    response.status(400).json({
      statusCode: 400,
      message: err.errors[0].message,
    });
  } else if (err.name === "Required") {
    response.status(400).json({
      statusCode: 400,
      message: "Email/password is required",
    });
  } else if (err.name === "JsonWebTokenError") {
    response.status(400).json({
      statusCode: 401,
      message: "Invalid Token",
    });
  } else if (err.name === "EXIST") {
    response.status(400).json({
      statusCode: 400,
      message: "Data Exist",
    });
  } else if (err.name === "InvalidToken") {
    response.status(401).json({
      statusCode: 401,
      message: "Please Login First",
    });
  } else if (err.name === "TOKEN_EXPIRED") {
    response.status(400).json({
      statusCode: 400,
      message: "Session expired",
    });
  } else if (err.name === "INVALID") {
    response.status(401).json({
      statusCode: 401,
      message: "Invalid username or password",
    });
  } else if (err.name === "NOT_FOUND") {
    response.status(404).json({
      statusCode: 404,
      message: "Not Found",
    });
  } else if (err.name === "Forbidden") {
    response.status(403).json({
      statusCode: 403,
      message: "Forbidden!",
    });
  } else if (err.name === "SequelizeDatabaseError") {
    response.status(400).json({
      statusCode: 400,
      message: "There is wrong input format",
    });
  } else {
    response.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = { errorHandle };
