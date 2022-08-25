import Router from "koa-router";
import { DefaultState, Context } from "koa";

import common from "../controllers/common";

const router = new Router<DefaultState, Context>();

// common routes
router.get("/api/test", common.test);
router.get("/api/getData", common.getDBdata);

export { router };
