import { Context } from "koa";
import getData from "../libs/db";
export default class GeneralController {
  public static async home(ctx: Context) {
    ctx.state = {
      title: "Hello Koa 2～",
    };
    await ctx.render("index");
  }
  public static async test(ctx: Context) {
    const result: any = {
      code: 401,
      data: [],
      message: "get failed~",
    };

    try {
      result.code = 200;
      result.data = true;
      result.message = "get successed~";
    } catch (err) {
      ctx.logger.error(err, { notice: "test" });
    } finally {
      ctx.body = result;
    }
  }

  public static async getDBdata(ctx: Context) {
    const result: any = {
      code: 401,
      data: [],
      message: "get failed~",
    };
    try {
      const sql = `SELECT * FROM test`;
      const dbData = await getData(sql);
      if (dbData) {
        result.code = 200;
        result.data = dbData;
        result.message = "get successed~";
      }
    } catch (err) {
      ctx.logger.error(err, { notice: "test" });
    } finally {
      ctx.body = result;
    }
  }
}
