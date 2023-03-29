import express from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import controllers from "./controllers";
import checkJwt from "./auth/checkJwt";
import auth0Data from "./auth/auth0Data";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use(checkJwt);
app.use(auth0Data);

app.use("/users", controllers.users);

app.use(errorHandler);

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
