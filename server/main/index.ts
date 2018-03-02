import * as api from "server/api";
import Koa, { Context } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import serializeError from "serialize-error";
import cors from "@koa/cors";
import { createConnection } from "typeorm";

const app = new Koa();
const router = new Router();

const endpoints = Object.keys(api) as (keyof api.APIType)[];

endpoints.forEach(path => router.post(`/${path}`, createEndpoint(api[path])));

app.use(cors({ origin: "*" }));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

createConnection().then(() => {
  app.listen(3000);
});

console.log(`Server running on http://localhost:3000`);

function createEndpoint(fn: Function) {
  return async (context: Context) => {
    try {
      context.body = await fn(...context.request.body);
      context.status = 200;
    } catch (error) {
      console.log(error);
      console.log(`500 for ${context.path}`);
      context.body = serializeError(error);
      context.status = 500;
    }
  };
}
