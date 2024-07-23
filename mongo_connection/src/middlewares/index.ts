import { NextFunction, Request, Response } from "express";
import fs from "fs";

function logReqRes(filename: fs.PathOrFileDescriptor) {
  return (req: Request, res: Response, next: NextFunction) => {
    fs.appendFile(
      filename ,
      `\nDate = ${Date.now()} , Ip = ${req.ip} , Method = ${req.method} , Path = ${req.path} \n`,
      (err: any) => {
        next();
      }
    );
  };
}

// module.exports = {
//     logReqRes
// }
export default logReqRes