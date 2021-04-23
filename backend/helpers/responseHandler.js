// response success handler

exports.successHandler = (res, data, statusCode = 200, result = 1, message = 'Success') => {
  res.status(statusCode).json({
    message,
    result,
    data
  });
};

exports.errorHandler = (res, statusCode = 400, message) => {
  res.status(statusCode).json({
    message
  });
};