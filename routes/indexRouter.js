const { Router } = require("express");
const usercontroler = require("../controllers/usercontroler")


const indexRouter = Router();

indexRouter.get("/",usercontroler.getProduct)
indexRouter.get("/new",usercontroler.CreateProduckGet)
indexRouter.post("/new",usercontroler.CreateProduckPost)
indexRouter.post("/delete/:id",usercontroler.DeleteProductPost);

module.exports=indexRouter;