import {addUser,getAllUsers,deleteUser,updateUser,getUserById} from "../controllers/user.js";
import express from "express";
const router=express.Router();

router.post("/",addUser);
router.get("/",getAllUsers);
router.put("/:idNumber",updateUser);
router.delete("/:idNumber",deleteUser);
router.get('/:idNumber', getUserById);


export default router;