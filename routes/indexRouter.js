const { Router } = require('express');
const usercontroler = require('../controllers/usercontroler');

const indexRouter = Router();

indexRouter.get('/', usercontroler.getProduct);
indexRouter.get('/newProduct', usercontroler.CreateProduckGet);
indexRouter.post('/newProduct', usercontroler.CreateProduckPost);
indexRouter.post('/deleteProduct/:id', usercontroler.DeleteProductPost);
indexRouter.get('/newCategories', usercontroler.CreateCategoryget);
indexRouter.post('/newCategories', usercontroler.createCategoryPost);
indexRouter.post('/deleteCategories/:id', usercontroler.deleteCategoryPost);
indexRouter.get('/categories/:id',usercontroler.Selectcategories)
indexRouter.post('/updatestock/:id',usercontroler.UpdateStockPost)

module.exports = indexRouter;
