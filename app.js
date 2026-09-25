const express = require ("express")
const app = express();
const path = require("path")
const indexRouter = require("./routes/indexRouter")
const PORT = 8080;



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));
app.use("/",indexRouter);


app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});

