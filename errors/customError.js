class CustomError extends Error {
  constructor(message, status = 500, additionalInfo = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

module.exports = CustomError;
