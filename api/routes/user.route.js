import express from "express";
import verfiyToken from "../utils/verifyUser.js";
import { deleteUser, getUserListings, test, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verfiyToken, updateUser);
router.delete("/delete/:id", verfiyToken, deleteUser);
router.get('/listings/:id',verfiyToken,getUserListings)


export default router;

