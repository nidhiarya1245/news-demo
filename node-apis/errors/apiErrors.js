const Boom = require('@hapi/boom');

module.exports = {
  apiErrorResponse: err => {
  const errorDetails = JSON.parse(err.message);
  console.log("root = ", err.message);
  const error = Boom.badRequest(errorDetails.message);
  error.output.statusCode = errorDetails.code;    // Assign a custom error code
  error.reformat();
  throw error;
}
};