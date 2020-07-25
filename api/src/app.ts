import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"))

app.get("/", function(req, res){
  return res.json({ server: "ok" })
})

export default app;