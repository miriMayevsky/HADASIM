import {AddNewVaccination,getAll,updateVaccination,deleteVaccination,GetById} from "../controllers/vaccination.js";
import express from "express";
const router=express.Router();

router.post("/:idNumber",AddNewVaccination);
router.get("/",getAll);
router.put("/:idNumber/:index",updateVaccination);
router.delete("/:idNumber/:index",deleteVaccination);
router.get('/:idNumber', GetById);


export default router;