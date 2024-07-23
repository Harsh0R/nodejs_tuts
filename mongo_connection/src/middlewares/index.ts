import { NextFunction, Request, Response } from "express";
import fs from "fs";

function logReqRes(filename) {
  return (req: Request, res: Response, next: NextFunction) => {
    fs.appendFile(
      filename ,
      `\n ${Date.now()} : ${req.ip} - ${req.method} : ${req.path} \n`,
      (err: any) => {
        next();
      }
    );
  };
}

module.exports = {
    logReqRes
}
