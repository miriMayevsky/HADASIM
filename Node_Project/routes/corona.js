import {AddNewDisease,getAll,updateDisease,deleteDisease,GetById} from "../controllers/corona.js";
import express from "express";
const router=express.Router();

router.post("/:idNumber",AddNewDisease);
router.get("/",getAll);
router.put("/:idNumber/:index",updateDisease);
router.delete("/:idNumber/:index",deleteDisease);
router.get('/:idNumber', GetById);


export default router;