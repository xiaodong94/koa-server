import Koa from "koa";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import json from "koa-json";
import jsonp from "koa-safe-jsonp";
import koaBody from "koa-body";
import path from "path";
import serve from "koa-static";
import handleRouter from "./system/control/handle-router";
import "dotenv/config";
const app = new Koa();
const port = process.env.PORT || 9127;

// public
app.use(serve(path.join(__dirname, "../public")));

// body / files
app.use(koaBody({ multipart: true }));
app.use(bodyParser({ enableTypes: ["json", "form", "text"] }));

// compress
app.use(
  compress({
    threshold: 2048,
  })
);

app.use(helmet());

// cors
app.use(
  cors({
    credentials: true,
    maxAge: 5 * 60,
    origin: (e: any) => {
      const white = ["http://127.0.0.1:3001"];

      if (white.includes(e.header.origin)) {
        return e.header.origin;
      }
    },
  })
);

// json
app.use(json());

// jsonp
jsonp(app);

// router
handleRouter(app);

app.on("error", (err) => {
  console.error(err);
});

// listening
app.listen(port, () => {
  console.log(`Server running on 127.0.0.1:${port}`);
});
