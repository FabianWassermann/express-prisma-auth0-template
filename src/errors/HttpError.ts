import HttpStatusCode from "./HttpStatusCode";

class HttpError extends Error {
  status: HttpStatusCode;

  constructor(status: HttpStatusCode, message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }
}

export default HttpError;
