const httMapError = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  BAD_REQUEST: 400,
  NO_CONTENT: 204,
};
    
const statusHttp = (status) => httMapError[status] || 500;
    
module.exports = statusHttp;