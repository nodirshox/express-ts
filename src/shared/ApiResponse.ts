import http from 'http';
import { Response } from 'express';

export default class ApiResponse {
  private msgCode: string;
  private code: number;
  private data: any;

  constructor(data: any, code = 200, msgCode?: string) {

    this.code = code;
    this.msgCode = this.msgCode || http.STATUS_CODES[code] || 'INTERNAL_SERVER_ERROR';
    this.msgCode = this.msgCode.replace(/\s/g, '_').toUpperCase();

    if (data) {
      this.data = data;
    }
  }

  send(res: Response) {
    const { code, ...payload } = this;
    res.status(this.code).send(payload);
  }
}