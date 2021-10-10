import { Request } from 'express';

export interface IGetTestInformation extends Request {
  id: number;
}
