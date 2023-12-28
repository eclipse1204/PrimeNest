//for user defined error like user not found
export const errorHandler = (statusCode, message) => {
    const error = new Error();     //we create a new error object
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };
  