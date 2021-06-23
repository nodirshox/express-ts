import http from 'http';
import { Response } from 'express';

export default class ApiError extends Error {
  isApiError = true;
  private code: number = 500;
  private msgCode: string | undefined;
  constructor(
    code: number,
    msgCode?: string, {
      message = '', stack = ''
    } = {}) {
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

  send(res: Response) {
    const { code, ...payload } = this;
    res.status(this.code).json(payload)
  }
}