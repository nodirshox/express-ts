import http from 'http';
import { Response } from 'express';

interface IApiErrorOptions {
  message?: string,
  stack?: string,
  err?: Error
};

export default class ApiError extends Error {
  isApiError = true;
  code: number = 500;
  msgCode: string | undefined;
  errors: any[];
  constructor(
    code: number,
    msgCode?: string, {
      message = '', stack = '', err
    }: IApiErrorOptions = {}) {
    super(msgCode || message);

    this.code = code;
    this.msgCode = this.msgCode || http.STATUS_CODES[code] || 'INTERNAL_SERVER_ERROR';
    this.msgCode = this.msgCode.replace(/\s/g, '_').toUpperCase();
    if (message) {
      this.message = message;
    }
    if (stack) {
      this.stack = stack;
    }
    return this;
  }
  setErrors(errors: any[]) {
    this.errors = errors;
  }
  setMessage(message: string) {
    this.message = message;
  }
  send(res: Response) {
    const { code, isApiError, ...payload } = this;
    res.status(this.code).json(payload)
  }
}