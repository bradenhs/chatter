import Koa from "koa";
import { add } from "server/adder";

const app = new Koa();

app.use(context => {
  context.response.body = "Hello";
});

console.log("Server started", add(1, 2));

app.listen(3000);
