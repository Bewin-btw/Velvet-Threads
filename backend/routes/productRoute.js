import express from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/productController";


const productRouter = express.Router();

productRouter.post("/add", addProduct)
productRouter.get("/list", listProducts)
productRouter.post("/remove", removeProduct)
productRouter.get("/single", singleProduct)


export default productRouter;