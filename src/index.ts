import Logger from "./core/Logger";
import { port } from "./config";
import app from "./app";


import express, { Express, Request, Response } from 'express';


app
  .listen(port, () => {
    console.log(`server running on port : ${port}`);
    Logger.info(`server running on port : ${port}`);
  })
  .on("error", (e) => {
    Logger.error(e);
    console.error(e);
  });
