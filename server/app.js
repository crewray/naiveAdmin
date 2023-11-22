const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
const path = require("path");
const Router = require("koa-router");
const router = new Router();
const { koaBody } = require("koa-body");
const cors = require("koa2-cors");
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      if (ctx.url === "/test") {
        return "*"; // 允许来自所有域名请求
      }
      return "http://localhost:3000"; //只允许http://localhost:3000这个域名的请求
    },
    // maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    // credentials: true, //是否允许发送Cookie
    // allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    // allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    // exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);
app.use(koaBody());
app.use(router.routes());
router.post("/addPage", async (ctx) => {
  // return console.log(ctx.request.body)
  const param = ctx.request.body;
  console.log(param);
  if (!param || !param.path) {
    ctx.body = {
      code: 400,
      msg: "path is required",
    };
    return;
  }
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", param.path.replace(/^\/\/$/g, "/") + ".vue"),
      `<template><div>new page</div></template>`
    );
    ctx.body = JSON.stringify({
      code: 200,
      msg: "success",
    });
  } catch (error) {
    ctx.body = JSON.stringify({
      code: 400,
      msg: "create file error",
    });
  }
});

app.listen(4000, () => {
  console.log("server is running at http://localhost:4000/");
});
