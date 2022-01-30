/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  export interface Request {
    id: number;
  }
  export interface Response {
    id: any;
  }
}
