class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: Error["message"], statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // For instanceof checks in some environments
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;