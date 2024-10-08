import express from "express";

const router = express.Router();


//middlewares
import { requireSignin ,isAdmin} from "../middlewares/auth.js";

//controllers
import {create,update,remove,list,read} from "../controllers/category.js";

router.post("/category",requireSignin,isAdmin,create);//create
router.put("/category/:categoryId",requireSignin,isAdmin,update);//update
router.delete("/category/:categoryId",requireSignin,isAdmin, remove);
router.get("/categories",list);
router.get("/category/:slug",read);

export default router;